const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFile = path.join(__dirname, '../data/users.txt');
const secretKey = 'your_secret_key';

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = `Username: ${username}, Email: ${email}, Password: ${hashedPassword}\n`;
    fs.appendFile(usersFile, userData, (err) => {
        if (err) return res.status(500).json({ message: 'Error saving user data' });
        res.json({ message: 'User registered successfully' });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    fs.readFile(usersFile, 'utf8', async (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading user data' });
        const users = data.split('\n').filter(line => line.includes(`Email: ${email}`));
        if (users.length === 0) return res.status(400).json({ message: 'User not found' });
        
        const user = users[0];
        const storedPassword = user.split('Password: ')[1];
        const isMatch = await bcrypt.compare(password, storedPassword);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        
        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;
