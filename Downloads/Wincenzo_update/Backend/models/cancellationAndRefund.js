const mongoose = require('mongoose');

const cancellationAndRefundSchema = mongoose.Schema({
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

module.exports = mongoose.model('cancellationAndRefund', cancellationAndRefundSchema);