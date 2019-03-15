// Dependencies
const express = require('express');
const router = express.Router();
const { getUserFromRequestLogged } = require('../../lib/jwtAuth');

router.post('/', (req, res, next) => {
  const user = getUserFromRequestLogged(req);

  if(!user){

  }
});

module.exports = router;