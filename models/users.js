const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    active_status: {
      type: Boolean,
      default: true,
      required: true,
    },
    profile_picture: {
      type: String,
      default: "public\\profile_pictures\\default_profile_picture.png",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
