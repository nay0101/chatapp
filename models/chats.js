const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const chatSchema = new Schema({
  user1_id: {
    type: mongoose.ObjectId,
    required: true,
  },
  user2_id: {
    type: mongoose.ObjectId,
    required: true,
  }
}, { timestamps: true });

const Chat = model('Chat', chatSchema);

module.exports = Chat;