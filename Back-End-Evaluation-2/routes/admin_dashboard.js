const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const bookingsFile = path.join(__dirname, '../data/bookings.txt');

// Get all bookings
router.get('/admin/bookings', (req, res) => {
    fs.readFile(bookingsFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading bookings file' });
        const bookings = data.split('\n').filter(line => line);
        res.json(bookings);
    });
});

// Delete a booking by name
router.delete('/admin/bookings/:name', (req, res) => {
    fs.readFile(bookingsFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading bookings file' });
        let bookings = data.split('\n').filter(line => line && !line.includes(`Name: ${req.params.name}`));
        fs.writeFile(bookingsFile, bookings.join('\n'), (err) => {
            if (err) return res.status(500).json({ message: 'Error updating bookings file' });
            res.json({ message: 'Booking deleted successfully' });
        });
    });
});

module.exports = router;