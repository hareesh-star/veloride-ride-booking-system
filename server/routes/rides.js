const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');
const auth = require('../middleware/auth');

// Create a ride (Rider)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'rider') return res.status(403).json({ msg: 'Only riders can book rides' });
    const { pickupLocation, dropLocation } = req.body;

    try {
        const newRide = new Ride({
            pickupLocation,
            dropLocation,
            riderId: req.user.id
        });
        const ride = await newRide.save();

        // Emit event to all connected clients (specifically drivers who are on the driver panel)
        req.io.emit('rideRequest', ride);

        res.json(ride);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Fetch all available pending rides (Driver)
router.get('/', auth, async (req, res) => {
    if (req.user.role !== 'driver') return res.status(403).json({ msg: 'Only drivers can view pending rides' });
    try {
        const rides = await Ride.find({ status: 'pending' }).populate('riderId', 'name');
        res.json(rides);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update ride status (Accepting or completing)
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'driver') return res.status(403).json({ msg: 'Only drivers can update rides' });
    const { status } = req.body;
    try {
        let ride = await Ride.findById(req.params.id);
        if (!ride) return res.status(404).json({ msg: 'Ride not found' });

        // Ensure the driver updating is the one who accepted or is currently accepting
        if (status === 'accepted') {
            if (ride.status !== 'pending') return res.status(400).json({ msg: 'Ride already accepted' });
            ride.driverId = req.user.id;
            ride.status = status;
        } else if (status === 'completed') {
            if (ride.driverId.toString() !== req.user.id) return res.status(403).json({ msg: 'Not authorized for this ride' });
            ride.status = status;
        }

        await ride.save();

        // Emit ride status update to clients
        req.io.emit('rideUpdated', ride);

        res.json(ride);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Ride history (for rider or driver)
router.get('/history', auth, async (req, res) => {
    try {
        let rides;
        if (req.user.role === 'rider') {
            rides = await Ride.find({ riderId: req.user.id }).populate('driverId', 'name');
        } else {
            rides = await Ride.find({ driverId: req.user.id }).populate('riderId', 'name');
        }
        res.json(rides);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
