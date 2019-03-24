const express = require('express');
const router = express.Router();

// get design page
router.get('/', function(req, res, next) {
    res.render('design', { title: 'Welldone' });
});

  
module.exports = router;