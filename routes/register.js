const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator/check');
const {validation, renderRegister} = require('../lib/userService');
const namedRoutes = require('../lib/namedRoutes');

const User = require('../models/user');

router.get('/', function(req, res, next) {
  renderRegister(res);
});

router.post('/',  validation, async function (req, res, next) {

  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      renderRegister(res, {
        errors: validationErrors.array({onlyFirstError: true}),
        name: req.body.name,
        last_name: req.body.last_name,
        nick_name: req.body.nick_name,
        email: req.body.email,
        description: req.body.description
      });
      return;
    }
    const userData = req.body;
    userData.password = await User.hashPassword(userData.password);
    const newUser = new User(userData);
    await newUser.save();
    res.redirect(namedRoutes.admin);

  } catch (err){
    renderRegister(res, {
      errors: [],
      name: req.body.name,
      last_name: req.body.last_name,
      nick_name: req.body.nick_name,
      email: req.body.email,
      description: req.body.description,
      message: res.__('There was an error entering the data')
    });
  }

});

module.exports = router;
