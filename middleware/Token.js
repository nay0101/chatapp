require("dotenv").config();
const jwt = require("jsonwebtoken");

const create_token = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const verify_token = (req, res, next) => {
  const another_token = req.app.get("jwt");
  const token = req.cookies.jwt || another_token;
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) return res.sendStatus(403);
    req.user_id = decodedToken.id;
    next();
  });
};

module.exports = { create_token, verify_token };
