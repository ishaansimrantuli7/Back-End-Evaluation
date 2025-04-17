const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const router = express.Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});

router.use(helmet());
router.use(limiter);

module.exports = router;
