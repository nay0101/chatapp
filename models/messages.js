const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const messageSchema = new Schema({
  chat_id: {
    type: mongoose.ObjectId,
    required: true,
  },
  sender_id: {
    type: mongoose.ObjectId,
    required: true,
  },
  receiver_id: {
    type: mongoose.ObjectId,
    required: true,
  }, 
  message: {
    type: String,
    required: true,
  },
  seen: {
    type: Boolean,
    default: false,
    required: true,
  }
}, { timestamps: true });

const Message = model('Message', messageSchema);

module.exports = Message;