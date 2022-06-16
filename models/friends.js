const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const friendSchema = new Schema({
  user1_id: {
    type: mongoose.ObjectId,
    required: true,
  },
  user2_id: {
    type: mongoose.ObjectId,
    required: true,
  }
}, { timestamps: true });

const Friend = model('Friend', friendSchema);

module.exports = Friend;