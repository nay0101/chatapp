const Chat = require("../models/chats");
const Message = require("../models/messages");

const get_chat_room = async (req, res) => {
  const user_id = req.user_id;
  try {
    const result = await Chat.findOne({
      $or: [
        { user1_id: user_id, user2_id: req.params.user_id },
        { user1_id: req.params.user_id, user2_id: user_id },
      ],
    });
    if (!result) return post_chat_room(req, res);
    res.status(200).json({ result });
  } catch (err) {
    res.sendStatus(400);
  }
};

const get_rooms = async (req, res) => {
  const user_id = req.user_id;

  try {
    const rooms = await Chat.find({
      $or: [{ user1_id: user_id }, { user2_id: user_id }],
    });
    res.status(200).json({ rooms });
  } catch (err) {
    res.sendStatus(400);
  }
};

const post_chat_room = async (req, res) => {
  const user_id = req.user_id;
  try {
    const result = await Chat.create({
      user1_id: user_id,
      user2_id: req.params.user_id,
    });

    res.status(201).json({ result });
  } catch (err) {
    res.sendStatus(400);
  }
};

const get_message = async (req, res) => {
  const user_id = req.user_id;
  const { skip } = req.query;
  try {
    const result = await Message.find({
      $or: [
        { sender_id: user_id, receiver_id: req.params.user_id },
        { sender_id: req.params.user_id, receiver_id: user_id },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .skip(skip);
    res.status(200).json({ result });
  } catch (err) {
    res.sendStatus(400);
  }
};

const post_message = async (req, res) => {
  const { message } = req.body;
  const receiver_id = req.params.receiver_id;
  const user_id = req.user_id;

  try {
    const chat_id = await Chat.findOne(
      {
        $or: [
          { user1_id: user_id, user2_id: receiver_id },
          { user1_id: receiver_id, user2_id: user_id },
        ],
      },
      "_id"
    );
    if (!chat_id) return res.sendStatus(404);
    await Message.create({
      chat_id,
      message,
      sender_id: user_id,
      receiver_id,
    });

    res.status(201).end();
  } catch (err) {
    res.sendStatus(400);
  }
};

module.exports = {
  get_chat_room,
  get_message,
  post_chat_room,
  post_message,
  get_rooms,
};
