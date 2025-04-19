const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  customerName: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    enum: ['DOST', 'BADADOST', 'PARTNER', 'MiTR'], 
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  img: {
    type: String, 
    required: true,
  },
});

module.exports = mongoose.model('users', userSchema);
