const mongoose = require('mongoose');

const {Types: mongooseTypes} = mongoose.Schema;

const drugSchema = new mongoose.Schema({
  name: {
    type: mongooseTypes.String,
    required: true,
    unique: true
  },
  price: {
    type: mongooseTypes.Number,
    required: true
  },
  type: {
    type: mongooseTypes.String,
    required: true
  },
  amount: {
    type: mongooseTypes.Number,
    required: true
  },
  createdAt: {
    type: mongooseTypes.Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now
  }
});

const Drug = mongoose.model('Drug', drugSchema);

module.exports = Drug;