const User = require("../models/users");

const user_get_all = async (req, res) => {
  try {
    const result = await User.find({}, "-password");
    res.status(200).json({ result });
  } catch (err) {
    res.sendStatus(400);
  }
};

const user_get_one = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const result = await User.findById(user_id, "-password");
    res.status(200).json({ result });
  } catch (err) {
    res.sendStatus(400);
  }
};

const user_get_chunk = async (req, res) => {
  const { id_list } = req.body;
  try {
    const result = await User.find({ _id: { $in: id_list } }, "-password");
    res.status(200).json({ result });
  } catch (err) {
    res.sendStatus(400);
  }
};

const user_update = async (req, res) => {
  try {
    if (req.user_id !== req.params.user_id) return res.sendStatus(403);
    const file = req.file;
    if (!file)
      req.body.profile_picture =
        "public\\default_profile_pictures\\default_profile_picture.png";
    if (file) req.body.profile_picture = file.path;
    await User.findByIdAndUpdate(req.params.user_id, req.body);
    res.status(200).end();
  } catch (err) {
    res.sendStatus(400);
  }
};

const user_delete = async (req, res) => {
  try {
    if (req.user_id !== req.params.user_id) return res.sendStatus(403);
    await User.findByIdAndDelete(req.params.user_id);
    res.status(200).end();
  } catch (err) {
    res.sendStatus(400);
  }
};

module.exports = {
  user_get_all,
  user_get_one,
  user_get_chunk,
  user_update,
  user_delete,
};
