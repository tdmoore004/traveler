const mongoose = require('mongoose');
const Trip = require('./trip');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  email: {
    type: String
  },
  password: {

  },
  trips: {
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    activity: {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        startActivityDate: {
            type: Date,
            required: true
        },
        endActivityDate: {
            type: Date,
            required: true
        },
    },
    flights: {
        flightNumber: {
            type: String,
            required: true
        },
        startFlightDate: {
            type: Date,
            required: true
        },
        endFlightDate: {
            type: Date,
            required: true
        },
    },
    lodging: {
        name: {
          type: String,
        }
    }
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;