const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// Route to book a cylinder
router.post('/bookcylinder', async (req, res) => {
    const { cylinder, userid, totalAmount, totalcylinder, weight, bodyweight, transactionId } = req.body;

    try {
        const newbooking = new Booking({
            cylinder: cylinder.name,
            cylinderid: cylinder._id,
            userid,
            weight,
            bodyweight,
            totalAmount,
            totalcylinder,
            transactionId,
            status: 'booked',
        });

        const booking = await newbooking.save();
        res.send('Booking successful');
    } catch (error) {
        console.error('Error booking cylinder:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Route to get all bookings
router.get('/getallbookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.send(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Route to get bookings by user ID
router.post('/getbookingsbyuserid', async (req, res) => {
    const { userid } = req.body;

    try {
        const bookings = await Booking.find({ userid: userid });
        res.send(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;