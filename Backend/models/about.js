const mongoose = require("mongoose");

const aboutSchema = mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  title: String,
  description: String,
  certificate: [
    {
      certificateImage: String,

      certificateSmallTitle: String,

      certificateTitle: String,

      certificateDescription: String,
    },
  ],
});

const about = mongoose.model("about", aboutSchema);

module.exports = about;
