const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const fs = require('fs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bookingsRouter = require('./routes/bookings'); // import bookings router
const User = require('./models/user');
const authRoutes = require('./routes/auth');


const app = express();
const PORT = 3000;

//Connecting MongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://shreya:bookverse@project.yxdkbsx.mongodb.net/bookverse?retryWrites=true&w=majority&appName=Project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Use authorization router
app.use('/', authRoutes);

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

// ✅ NEW: About route
app.get('/about', (req, res) => {
  res.render('about');
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
