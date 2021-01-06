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
    activity: [{
        name: {
            type: String,
            required: false
        },
        startDate: {
            type: Date,
            required: false
        },
        endDate: {
            type: Date,
            required: false
        },
        additionalInfo: {
            type: String,
        }
    }],
    flight: [{
        name: {
            type: String,
            required: false
        },
        startDate: {
            type: Date,
            required: false
        },
        endDate: {
            type: Date,
            required: false
        },
        additionalInfo: {
            type: String
        }
    }],
    lodging: [{
        name: {
            type: String,
            required: false
        },
        startDate: {
            type: Date,
            required: false
        },
        endDate: {
            type: Date,
            required: false
        },
        additionalInfo: {
            type: String
        }
    }]
});

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;