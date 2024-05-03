const mongoose = require("mongoose");

const shippingAndDeliverySchema = mongoose.Schema(
  {
    description: {
      type: String,
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

module.exports = mongoose.model("ShippingAndDelivery", shippingAndDeliverySchema);