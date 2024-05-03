const mongoose = require("mongoose");

const homePageSchemas = mongoose.Schema({
  homePageTitle: {
    type: String,
  },
  banerTitle: {
    type: String,
  },
  banerDescription: {
    type: String,
  },
  banerImages: [
    {
      type: String,
    }
  ],
  feature: [
    {
      featureImage: {
        type: String,
      },
      featureTitle: {
        type: String,
      },
      featureDescription: {
        type: String,
      },
    },
  ],
  higlightProductTitle: {
    type: String,
  },
  higlightProductDescription: {
    type: String,
  },
  higlightProductImage: {
    type: String,
  },
  higlightProductFeature: [
    {
      productFeature: {
        type: String
      },
      productFeatureThumb: {
        type: String
      }
    }
  ],
  videoUrl: {
    type: String,
  },
  videoTitle: {
    type: String,
  },
  videosDiscription: {
    type: String,
  },
  experienceTitle: {
    type: String,
  },
  experienceDescription: {
    type: String,
  },
  productGallery: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  brandImage: [
    {
      type: String,
    },
  ],
  packageDelivered: {
    type: String
  },
  countriesCovered: {
    type: String
  },
  happyCustomer: {
    type: String
  },
  yearOfExperience: {
    type: String
  },
  topOfferLine: {
    type: String
  },
  advertisement: [
    {
      advertisVideoThumbnail: { type: String },
      advertisVideoTitle: { type: String },
      advertisVideoDescription: { type: String },
      advertisVideoUrl: { type: String },
    },
  ]

});

const homePage = mongoose.model("HomePage", homePageSchemas);

module.exports = homePage;
