const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const bookingsFile = path.join(__dirname, '../data/bookings.txt');

router.get('/my-bookings/:email', (req, res) => {
    fs.readFile(bookingsFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading bookings file' });
        const userBookings = data.split('\n').filter(line => line.includes(`Email: ${req.params.email}`));
        res.json(userBookings);
    });
});

module.exports = router;