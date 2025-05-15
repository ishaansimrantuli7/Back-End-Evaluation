// routes/bookings.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// defining path to store bookings
const bookingsFile = path.join(__dirname, '../data/bookings.txt');

// Handle reservation form submission
router.post('/', (req, res) => {
  // Extracting booking details from request
  const { name, email, number,book,gender} = req.body;
  const bookingData = `Name: ${name}, Email: ${email}, Number: ${number},Book: ${book},Gender: ${gender}\n`;

  fs.appendFile(bookingsFile, bookingData, (err) => {
    if (err) return res.status(500).json({ message: 'Error saving booking data' });
    res.json({ message: 'Reservation submitted successfully' });
  });
});

module.exports = router;
