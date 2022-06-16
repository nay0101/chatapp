const express = require("express");
const router = express.Router();
const { profileUploads } = require("../middleware/Multer");
const user = require("../controllers/UserController");

router.get("/", user.user_get_all);
router.get("/:user_id", user.user_get_one);
router.post("/chunk", user.user_get_chunk);
router.put("/:user_id", profileUploads.single("image"), user.user_update);
router.delete("/:user_id", user.user_delete);

module.exports = router;
