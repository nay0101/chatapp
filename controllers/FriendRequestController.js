const Friend = require("../models/friends");
const Request = require("../models/friend_request");

const get_friend_request = async (req, res) => {
  const user_id = req.user_id;
  const { request_type } = req.query;
  try {
    if (!request_type) res.sendStatus(404);
    if (request_type === "received") {
      const result = await Request.find({ receiver_id: user_id });
      res.status(200).json({ result });
    }
    if (request_type === "sent") {
      const result = await Request.find({ sender_id: user_id });
      res.status(200).json({ result });
    }
  } catch (err) {
    res.sendStatus(400);
  }
};

const post_friend_request = async (req, res) => {
  const user_id = req.user_id;
  try {
    const check_friend = await Friend.findOne({
      $or: [
        { user1_id: user_id, user2_id: req.params.receiver_id },
        { user1_id: req.params.receiver_id, user2_id: user_id },
      ],
    });
    if (check_friend) return res.status(400).send("Already Friends.");
    const result = await Request.create({
      receiver_id: req.params.receiver_id,
      sender_id: user_id,
    });
    res.status(200).send(result);
  } catch (err) {
    res.sendStatus(400);
  }
};

const accept_request = async (req, res) => {
  const request_id = req.params.request_id;

  try {
    const check_request = await Request.findById(request_id);
    await Friend.create({
      user1_id: check_request.sender_id,
      user2_id: check_request.receiver_id,
    });
    delete_request(req, res);
  } catch (err) {
    res.sendStatus(400);
  }
};

const delete_request = async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.request_id);
    res.status(200).end();
  } catch (err) {
    res.sendStatus(400);
  }
};

module.exports = {
  get_friend_request,
  post_friend_request,
  accept_request,
  delete_request,
};
