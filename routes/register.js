const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/', async function (req, res, next) {
  try {
    const userData = req.body
    const newUser = new User(userData)
    const newUserSaved = await newUser.save()
    res.json({success: true, user: newUserSaved})
  } catch (err){
    next(err)
  }
})

module.exports = router;
