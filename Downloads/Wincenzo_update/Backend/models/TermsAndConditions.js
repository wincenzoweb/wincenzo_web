const mongoose = require("mongoose");

const TermsAndConditionsschema = mongoose.Schema(
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

module.exports = mongoose.model("TermsAndConditions", TermsAndConditionsschema);
