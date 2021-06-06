const express = require('express');
const router = express.Router();

// HTTP Verbs
// GET METHOD
router.get('/', (req, res) => {
    // res.send('Hello World');
    res.render('index', {'title':'My Express Movie App', message: 'Welcome to Movie Database'})
});

module.exports = router;