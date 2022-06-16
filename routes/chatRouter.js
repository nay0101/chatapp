const express = require("express");
const router = express.Router();
const chat = require("../controllers/ChatController");

router.get("/rooms", chat.get_rooms);
router.get("/:user_id", chat.get_chat_room);
router.get("/:user_id/messages", chat.get_message);
router.post("/:receiver_id/messages", chat.post_message);

module.exports = router;
