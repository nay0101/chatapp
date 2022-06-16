const express = require("express");
const router = express.Router();
const friend = require("../controllers/FriendController");

router.get("/:user_id", friend.get_all_friend);
router.delete("/:friend_id", friend.delete_friend);

module.exports = router;
