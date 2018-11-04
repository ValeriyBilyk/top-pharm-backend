const mongoose = require('mongoose');

const {Types: mongooseTypes} = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  user: {
    type: mongooseTypes.ObjectId,
    ref: 'User',
    required: true
  },
  purchases: [{
      drug: {
        type: mongooseTypes.ObjectId,
        ref: 'Drug',
        required: true
      },
      amount: mongooseTypes.Number
    }
  ],
  createdAt: {
    type: mongooseTypes.Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;