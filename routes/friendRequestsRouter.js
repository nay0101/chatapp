const express = require("express");
const router = express.Router();
const friend_request = require("../controllers/FriendRequestController");

router.get("/", friend_request.get_friend_request);
router.post("/:receiver_id", friend_request.post_friend_request);
router.post("/accept/:request_id", friend_request.accept_request);
router.delete("/delete/:request_id", friend_request.delete_request);

module.exports = router;
