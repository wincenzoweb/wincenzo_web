const mongoose = require("mongoose");

const advertisementVideoSchema = new mongoose.Schema(
  {
    advertisementVideoTitle: { type: String },
    advertisementVideoDescription: { type: String },
    advertisementVideoThumbnail: { type: String },
    advertisementVideoUrl: { type: String }
  }
);

const AdvertisementVideo = mongoose.model("AdvertisementVideo", advertisementVideoSchema);

module.exports = AdvertisementVideo;
