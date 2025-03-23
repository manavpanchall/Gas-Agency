require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingsRoute = require('./server/routes/bookingsRoute');
const cylindersRoute = require('./server/routes/cylindersRoute');
const paymentRoute = require('./server/routes/paymentRoute');
const usersRoute = require('./server/routes/usersRoute');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from frontend
    credentials: true // Allow credentials (e.g., cookies)
}));
app.use(express.json()); // Parse JSON request bodies

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true // Enable automatic index creation
});

const connection = mongoose.connection;
connection.on('error', (error) => {
    console.error('MongoDB connection failed:', error);
});
connection.once('open', () => {
    console.log('MongoDB connection successful');
});

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

// Export the app for Vercel Serverless Functions
module.exports = app;