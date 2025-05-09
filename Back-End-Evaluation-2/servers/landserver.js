const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/landing.html'));
});

app.listen(PORT, () => {
    console.log(`Landing server running at http://localhost:${PORT}`);
});
