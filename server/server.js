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
  origin: ['https://gas-agency-frontend.vercel.app', 'http://localhost:3000'], // Allow requests from these origins
  credentials: true, // Allow credentials (e.g., cookies)
}));

// Middleware
app.use(express.json()); // Parse JSON request bodies

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true, // Enable automatic index creation
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
    error: process.env.NODE_ENV === 'development' ? err : {}, // Show full error in development
  });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));