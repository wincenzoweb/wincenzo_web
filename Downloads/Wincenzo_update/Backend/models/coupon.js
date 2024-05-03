const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  startDate: { type: Date, required: true },
  percentage:{ type: Date, required: true },
  expirationDate: { type: Date, required: true },
  authorName: { type: String }, 
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
