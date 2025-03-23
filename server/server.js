require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');
const cylindersRoute = require('./routes/cylindersRoute');
const paymentRoute = require('./routes/paymentRoute');

const app = express();

// CORS Configuration
app.use(cors({
  origin: ['https://gas-agency-frontend.vercel.app', 'http://localhost:3000'],
  credentials: true,
}));

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection failed:', err));

// Log environment variables for debugging
console.log('Razorpay Key ID:', process.env.RAZORPAY_KEY_ID);
console.log('Razorpay Key Secret:', process.env.RAZORPAY_KEY_SECRET);

// Routes
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/cylinders', cylindersRoute);
app.use('/api/payment', paymentRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));