const mongoose = require('mongoose');
const Trip = require('./trip');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: Date,
    default: Date.now
  },
  phoneNumber: {
    type: String
  },
  email: {
    type: String
  },
  password: {

  },
  trips: [Trip]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;