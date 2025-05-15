// routes/bookings.js
const express = require('express');
const router = express.Router();
const Book = require('../models/book'); // Mongoose model

// POST route: handle reservation form submission
router.post('/', async (req, res) => {
  const { name, email, number, book, gender } = req.body;

  try {
    const newBooking = new Book({
      username: name,
      bookTitle: book,
      bookingDate: new Date(), // optional
      status: 'pending'        // optional default
    });

    await newBooking.save();
    res.status(201).json({ message: 'Reservation submitted successfully' });
  } catch (err) {
    console.error('Error saving booking:', err);
    res.status(500).json({ message: 'Error saving booking data' });
  }
});

// GET route: fetch all bookings (optional for admin/dashboard use)
router.get('/', async (req, res) => {
  try {
    const bookings = await Book.find();
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

module.exports = router;
