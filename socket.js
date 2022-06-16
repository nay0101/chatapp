const { parse } = require("cookie");

module.exports = (io, app) => {
  io.on("connection", (socket) => {
    const cookie = socket.handshake.headers.cookie;
    if (cookie) app.set("jwt", parse(cookie).jwt);

    let roomID;
    let users = [];
    const userID = socket.handshake.auth.userID;
    socket.userID = userID;

    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: socket.userID,
        socketID: socket.id,
      });
    }
    socket.emit("users", users);

    socket.broadcast.emit("user connected", {
      userID: socket.userID,
      socketID: socket.id,
    });
    console.log(`Connected-${socket.id}`);

    socket.on("joinRoom", (room) => {
      const rooms = Array.from(socket.rooms);
      if (rooms.length > 1) {
        socket.leave(rooms[1]);
      }
      roomID = room;
      socket.join(roomID);
    });

    socket.on("leaveRoom", () => {
      socket.leave(roomID);
    });

    socket.on("message", ({ to, message, activeUsers }) => {
      io.in(roomID).emit("get message", { message, from: socket.userID });

      activeUsers.forEach((user) => {
        if (user.userID === to) {
          io.to(user.socketID).emit("message notification", message);
        }
        if (user.userID === socket.userID) {
          socket.emit("message update", message);
          socket.to(user.socketID).emit("message update", message);
        }
      });
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("user disconnected", {
        userID: socket.userID,
        socketID: socket.id,
      });
    });
  });
};
