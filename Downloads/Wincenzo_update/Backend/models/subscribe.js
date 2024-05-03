const mongoose = require("mongoose");

const subscribeschema = mongoose.Schema(
  {
    email: {
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


const Subscribe = mongoose.model("Subscribe", subscribeschema);

module.exports = Subscribe