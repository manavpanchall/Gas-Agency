const mongoose = require('mongoose');

var mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true // Add this for better performance
});

const connection = mongoose.connection;

connection.on('error', () => {
  console.error('MongoDB connection failed');
});

connection.once('open', () => {
  console.log('MongoDB connection successful');
});
module.exports = mongoose;