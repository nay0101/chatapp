const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const friendRequestSchema = new Schema({
  sender_id: {
    type: mongoose.ObjectId,
    required: true,
  },
  receiver_id: {
    type: mongoose.ObjectId,
    required: true,
  }
}, { timestamps: true });

const FriendRequest = model('Friend_Request', friendRequestSchema);

module.exports = FriendRequest;