const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const bookingsFile = path.join(__dirname, '../data/bookings.txt');

// Search for books by title
router.get('/search-books', (req, res) => {
    const { title } = req.query;
    fs.readFile(bookingsFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading bookings file' });
        const results = data.split('\n').filter(line => line.toLowerCase().includes(title.toLowerCase()));
        res.json(results);
    });
});

// Check book availability
router.get('/check-availability/:book', (req, res) => {
    fs.readFile(bookingsFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading bookings file' });
        const count = data.split('\n').filter(line => line.includes(req.params.book)).length;
        res.json({ book: req.params.book, available: count < 5 });
    });
});

module.exports = router;