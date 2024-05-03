const mongoose = require("mongoose");

const messageschema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamp: true,
  }
);
const Message = mongoose.model("Message", messageschema);

module.exports = Message;
