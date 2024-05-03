// models/order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      // paymentStatus: {
      //   type: String,
      //   enum: ['success', 'PENDING'],
      //   default: 'PENDING',
      // },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    label: String,
    address: String,
    country: String,
    state: String,
    city: String,
    zipCode: Number
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "canceled", "accepted", "rejected", "return","self buy"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["Cash on Delivery", "Online Payment"],
    default: "Online Payment",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;