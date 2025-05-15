const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  username: { type: String, required: true },   // person making the booking
  bookTitle: { type: String, required: true },  // book being reserved
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' }  // can be 'pending', 'approved', etc.
});

module.exports = mongoose.model('Book', bookSchema);
