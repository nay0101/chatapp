require("dotenv").config();
const http = require("http");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const { v4: genuuid } = require("uuid");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const { verify_token } = require("./middleware/Token");

mongoose
  .connect(process.env.DB_URL || "mongodb://127.0.0.1/chatApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

const app = express();
const port = process.env.PORT || "4000";
const httpServer = http.createServer(app);
let io;

if (process.env.NODE_ENV === "development") {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
}

if (process.env.NODE_ENV === "production") {
  io = new Server(httpServer, {});
}

const loginRouter = require("./routes/loginRouter");
const usersRouter = require("./routes/usersRouter");
const friendsRouter = require("./routes/friendsRouter");
const friendRequestsRouter = require("./routes/friendRequestsRouter");
const chatRouter = require("./routes/chatRouter");

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

if (process.env.NODE_ENV === "development") {
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    genid: () => {
      return genuuid();
    },
    name: "session_id",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: false },
    unset: "destroy",
  })
);
app.use("/api", loginRouter);
app.use("/api/users", verify_token, usersRouter);
app.use("/api/friends", verify_token, friendsRouter);
app.use("/api/friend_requests", verify_token, friendRequestsRouter);
app.use("/api/chat", verify_token, chatRouter);

app.use(express.static(path.resolve(__dirname, "client/build")));
app.use("/api/public", express.static(path.join(__dirname, "public")));
app.get("*", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});

require("./socket")(io, app);
app.set("socketio", io);

httpServer.listen(port);

module.exports = app;
