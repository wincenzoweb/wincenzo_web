const mongoose = require('mongoose');

const privacyPolicySchema = mongoose.Schema({
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamp: true
    })

module.exports = mongoose.model('privacyPolicy', privacyPolicySchema);