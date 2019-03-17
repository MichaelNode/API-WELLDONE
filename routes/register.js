const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator/check');
const validations = require('../lib/validationsRegisterForm');

const User = require('../models/user');


router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/',  validations, async function (req, res, next) {

  try {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      const errorMessage = validationErrors.array()[0].msg
      res.render('register', {message: errorMessage})
      return;
    }
    const userData = req.body;
    userData.password = await User.hashPassword(userData.password);
    const newUser = new User(userData);
    const newUserSaved = await newUser.save();
    res.render('register', {message: res.__('{{name}}: You have successfully registered!', {'name': newUserSaved.name})});


  } catch (err){
    console.log(err);
    res.render('register', {message: res.__('There was an error entering the data') });

  }

})

module.exports = router;
