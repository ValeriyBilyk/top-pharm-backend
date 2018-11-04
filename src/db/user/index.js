const mongoose = require('mongoose');

const {Types: mongooseTypes} = mongoose.Schema;

const userSchema = new mongoose.Schema({
  firstName: mongooseTypes.String,
  lastName: mongooseTypes.String,
  email: { type: mongooseTypes.String, lowercase: true},
  phoneNumber: {
    type: mongooseTypes.String
  },
  password: {
    type: mongooseTypes.String,
  },
  role: {
    type: mongooseTypes.String
  },
  createdAt: {
    type: mongooseTypes.Date,
    default: function () {
      return this.isNew ? Date.now() : null
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;