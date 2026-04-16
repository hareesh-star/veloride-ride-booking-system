const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
    pickupLocation: { type: String, required: true },
    dropLocation: { type: String, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'accepted', 'completed'] },
    riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Ride', RideSchema);
