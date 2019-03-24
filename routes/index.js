const express = require('express');
const router = express.Router();
const namedRoutes = require('../lib/namedRoutes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect(namedRoutes.articles);
});


module.exports = router;
