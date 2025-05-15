const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bookingsRouter = require('./routes/bookings'); // import bookings router

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Use bookings router
app.use('/bookings', bookingsRouter);

// JWT secret key
const secretKey = 'your_secret_key';
const usersFile = path.join(__dirname, 'data/users.txt');

// Routes
app.get('/', (req, res) => {
  res.render('home', { username: 'BookverseUser' });
});

app.get('/register', (req, res) => {
  res.render('registration');
});

app.get('/reserve', (req, res) => {
  res.render('index');
});

// About route
app.get('/about', (req, res) => {
  res.render('about');
});

app.post('/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  const userData = `Username: ${username}, Email: ${email}, Password: ${password}\n`;

  fs.appendFile(usersFile, userData, (err) => {
    if (err) return res.status(500).json({ message: 'Error saving user data' });
    res.json({ message: 'User registered successfully' });
  });
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  fs.readFile(usersFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading user data' });
    const users = data.split('\n').filter(line => line.includes(`Email: ${email}`));
    if (users.length === 0) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
