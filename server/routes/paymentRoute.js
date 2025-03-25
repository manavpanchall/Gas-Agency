const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config(); // Add this line to load .env variables

// Initialize Razorpay with proper error handling
let razorpay;
try {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
  
  console.log('Razorpay initialized successfully');
} catch (error) {
  console.error('Razorpay initialization failed:', error.message);
  process.exit(1); // Exit if Razorpay can't initialize
}

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
    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ 
      success: false,
      message: 'Payment processing failed',
      error: error.message 
    });
  }
});

module.exports = router;