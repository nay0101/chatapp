const express = require("express");
const router = express.Router();
const { profileUploads } = require("../middleware/Multer");
const login = require("../controllers/LoginController");

router.post("/login", login.login);
router.post("/signup", profileUploads.single("image"), login.sign_up);
router.get("/logout", login.logout);

module.exports = router;
