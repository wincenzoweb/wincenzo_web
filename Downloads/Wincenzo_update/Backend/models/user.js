const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'deliveryboy'], // <-- Check enum definition
    default: 'user'
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  shippingAddresses: [{ 
    label: String, 
    address: String,
    country: String,
    state: String,
    city: String,
    zipCode: Number,
  }],
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;