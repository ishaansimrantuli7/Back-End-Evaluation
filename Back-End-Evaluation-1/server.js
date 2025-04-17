const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, phone, book, date, gender } = req.body;

    if (!name || !email || !phone || !book || !date || !gender) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const data = `Name: ${name}, Email: ${email}, Phone: ${phone}, Book: ${book}, Date: ${date}, Gender: ${gender}\n`;

    fs.appendFile('bookings.txt', data, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error saving data.' });
        }
        res.status(200).json({ message: 'Data saved successfully.' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
