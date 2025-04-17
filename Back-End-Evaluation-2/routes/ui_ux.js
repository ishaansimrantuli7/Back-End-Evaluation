const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/toggle-theme', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/js/toggleTheme.js'));
});

module.exports = router;
