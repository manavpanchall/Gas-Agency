const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, required: true },
  cylinder: { type: String, required: true },
  cylinderid: { type: mongoose.Schema.Types.ObjectId, required: true },
  weight: { type: Number, required: true },
  bodyweight: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  totalcylinder: { type: Number, required: true },
  transactionId: { type: String, required: true },
  status: { type: String, default: 'booked' },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;