// models/orderAssignment.js
const mongoose = require('mongoose');

const orderAssignmentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    unique:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,

  },
  deliveryBoyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    
  },
  status: {
    type: String,
    enum: ['assigned', 'picked', 'delivered', 'return', 'rescheduled'],
    default: 'assigned'
  }
}, { timestamps: true });

const OrderAssignment = mongoose.model('OrderAssignment', orderAssignmentSchema);

module.exports = OrderAssignment;
