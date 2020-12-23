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
        activityStart: {
          type: Date,
          required: true
        },
        activityEnd: {
          type: Date,
          required: true
        },
        additionalInfo: {
            type: String,
        },
    },
    flights: {
        flightNumber: {
            type: String,
            required: true
        },
        departure: {
            type: Date,
            required: true
        },
        arrival: {
            type: Date,
            required: true
        },
        additionalInfo: {
          type: String,
      }
    },
    lodging: {
        name: {
          type: String,
        },
        checkIn: {
          type: Date,
          required: true
        },
        checkOut: {
          type: Date,
          required: true
        },
        additionalInfo: {
            type: String,
        },
    }
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;