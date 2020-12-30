const mongoose = require('mongoose');
const Trip = require('./trip');
const Schema = mongoose.Schema;

// https://mongoosejs.com/docs/populate.html

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  trips: [{ type: Schema.Types.ObjectId, ref: 'Trip' }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
