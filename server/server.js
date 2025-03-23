require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');
const cylindersRoute = require('./routes/cylindersRoute');
const paymentRoute = require('./routes/paymentRoute');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from frontend
    credentials: true // Allow credentials (e.g., cookies)
}));
app.use(express.json()); // Parse JSON request bodies

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connection successful'))
    .catch((error) => console.error('MongoDB connection failed:', error));

// Routes
app.use('/api/users', usersRoute); // User-related routes
app.use('/api/bookings', bookingsRoute); // Booking-related routes
app.use('/api/cylinders', cylindersRoute); // Cylinder-related routes
app.use('/api/payment', paymentRoute); // Payment-related routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: process.env.NODE_ENV === 'development' ? err : {} // Show full error in development
    });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));