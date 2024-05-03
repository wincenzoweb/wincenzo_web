const mongoose = require("mongoose");

const orgSchema = mongoose.Schema(
  {
    email: String,
    phoneNumber: String,
    address: String,
    map: String,

    // footerLogo: {
    //     type: String
    // },
    footerDiscription: {
        type: String
    },
    footerFacebookLogo: {
        type: String
    },
    footerTwitterLogo: {
        type: String
    },
    footerLinkedInLogo: {
        type: String
    },
    footerInstagramLogo: {
        type: String
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

module.exports = mongoose.model("org", orgSchema);
