const express = require('express');
const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const bookingsFile = path.join(__dirname, '../data/bookings.txt');

router.get('/generate-qr/:name', (req, res) => {
    fs.readFile(bookingsFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading bookings file' });
        const booking = data.split('\n').find(line => line.includes(`Name: ${req.params.name}`));
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        
        qrcode.toDataURL(booking, (err, url) => {
            if (err) return res.status(500).json({ message: 'QR Code generation failed' });
            res.json({ qrCode: url });
        });
    });
});

module.exports = router;