const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  razorpay: {
    apiKey: {
      type: String,
      required: true
    },
    secretKey: {
      type: String,
      required: true
    }
  },
  twilio: {
    accountSid: {
      type: String,
      required: true
    },
    authToken: {
      type: String,
      required: true
    }
  },
  googleAnalytics: {
    trackingId: {
      type: String,
      required: true
    }
  },
  mongodb: {
    databaseURL: {
      type: String,
      required: true
    }
  }
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
