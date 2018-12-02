const mongoose = require('mongoose');

const {Types: mongooseTypes} = mongoose.Schema;

const drugAction = new mongoose.Schema({
  user: {
    type: mongooseTypes.ObjectId,
    ref: 'User',
    required: true
  },
  actions: [{
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
  },
  type: {
    type: mongooseTypes.String,
    enum: ['order', 'increase-amount', 'decrease-amount']
  }
});

const DrugAction = mongoose.model('DrugAction', drugAction, 'drugActions');

module.exports = DrugAction;