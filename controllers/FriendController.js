const Friend = require("../models/friends");

const get_all_friend = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    let friends = [];
    const result = await Friend.find(
      { $or: [{ user1_id: user_id }, { user2_id: user_id }] },
      "user1_id user2_id -_id"
    );
    result.forEach((friend) => {
      if (friend.user1_id.toString() === user_id) {
        friends.push(friend.user2_id);
      } else {
        friends.push(friend.user1_id);
      }
    });

    res.status(200).json({ friends });
  } catch (err) {
    res.sendStatus(400);
  }
};

const delete_friend = async (req, res) => {
  const user_id = req.user_id;
  try {
    await Friend.findOneAndDelete({
      $or: [
        { user1_id: user_id, user2_id: req.params.friend_id },
        { user1_id: req.params.friend_id, user2_id: user_id },
      ],
    });
    res.status(200).end();
  } catch (err) {
    res.sendStatus(400);
  }
};

module.exports = { get_all_friend, delete_friend };
