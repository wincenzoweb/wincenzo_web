


const mongoose = require("mongoose");

const reviewVideoSchema = new mongoose.Schema(
  {
    reviewVideoTitle: { type: String },
    reviewVideoDescription: { type: String },
    reviewVideoThumbnail: { type: String },
    reviewVideoUrl: { type: String }
  }
);

const ReviewVideo = mongoose.model("ReviewVideo", reviewVideoSchema);

module.exports = ReviewVideo;
