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
    }
});

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;