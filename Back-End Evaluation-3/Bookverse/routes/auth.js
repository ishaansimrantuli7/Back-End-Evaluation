// Importing modules
const express = require('express');
//creating express router
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/register', (req, res) => {
  //extracting user data
const { username, email, password } = req.body;
  const userData = `Username: ${username}, Email: ${email}, Password: ${password}\n`;
  fs.appendFile(path.join(__dirname, '../users.txt'), userData, err => {
    if (err) {
      console.error('Error writing user data:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/login.html'); // or wherever you want to redirect
  });
});
// exporting router
module.exports = router;
