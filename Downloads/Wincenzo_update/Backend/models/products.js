const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: {
    type: String,
    required: true,
  },

  price: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  percentage:{type: Number},
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  }, // Reference to the Category schema

  thumbnailImage: { type: String }, // Store the path to the thumbnail image
  galleryImages: [{ type: String }], // Store paths to multiple gallery images
  // conditions: [String],

  quantity: {
    type: Number,
    required: true,
  },
  ratings: [
    {
      star: Number,
      comment: String,
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: String,
      createdAt: String,
    }
  ],
  sold: {
    type: Number,
    default: 0,
    select: false,
  },
  totalratings: { type: String, default: 0 },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
