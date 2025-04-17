const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with actual email
        pass: 'your-email-password' // Replace with actual password
    }
});

const sendBookingConfirmation = (email, book, date) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Book Reservation Confirmation',
        text: `Your reservation for '${book}' on ${date} has been confirmed.`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log('Email error:', err);
        else console.log('Email sent:', info.response);
    });
};

router.post('/send-confirmation', (req, res) => {
    const { email, book, date } = req.body;
    if (!email || !book || !date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    sendBookingConfirmation(email, book, date);
    res.json({ message: 'Confirmation email sent' });
});

module.exports = router;