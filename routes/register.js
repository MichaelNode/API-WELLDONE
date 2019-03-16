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
    } 
    const userData = req.body;
    userData.password = await User.hashPassword(userData.password); 
    const newUser = new User(userData);
    const newUserSaved = await newUser.save();
    res.render('register', {message: `${newUserSaved.name}: ¡Te has dado de alta con éxito!`});


  } catch (err){

    res.render('register', {message: 'Hubo un error al ingresar los datos' });

  }

})

module.exports = router;
