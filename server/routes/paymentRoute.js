const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay with environment variables
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // Use environment variable
    key_secret: process.env.RAZORPAY_KEY_SECRET, // Use environment variable
});

// Create a Razorpay order
router.post('/create-order', async (req, res) => {
    const { amount } = req.body;

    const options = {
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        receipt: crypto.randomBytes(10).toString('hex'),
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;