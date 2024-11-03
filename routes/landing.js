// routes/landing.js
const express = require('express');
const router = express.Router();

// Route untuk landing page
router.get('/', (req, res) => {
    res.render('landing'); // render view landing.ejs
});

module.exports = router;
