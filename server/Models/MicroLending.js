const mongoose = require('mongoose');

const microLendingSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['TOOL', 'MACHINERY', 'SEEDS', 'SERVICE']
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  availability: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'PENDING', 'RENTED', 'COMPLETED'],
    default: 'AVAILABLE'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  renter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  location: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MicroLending', microLendingSchema); 