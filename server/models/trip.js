const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
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