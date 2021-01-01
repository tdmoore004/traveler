const mongoose = require('mongoose');
const User = require('./user.js')
const Schema = mongoose.Schema;

const TripSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
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
            required: false
        },
        description: {
            type: String,
        },
        startActivityDate: {
            type: Date,
            required: false
        },
        endActivityDate: {
            type: Date,
            required: false
        },
    },
    flights: {
        flightNumber: {
            type: String,
            required: false
        },
        startFlightDate: {
            type: Date,
            required: false
        },
        endFlightDate: {
            type: Date,
            required: false
        },
    }
});

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;