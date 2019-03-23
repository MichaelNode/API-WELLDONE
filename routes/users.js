var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
const User = require('../models/user');
const {renderForgot, renderChangepass } = require('../lib/passService');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/forgot', function(req, res) {
  res.render('users/forgot', {
    user: 'req.user'
  });
});

router.post('/forgot', async function(req, res, next) {
  try {
    await renderForgot(req, res,next);
  } catch(err){
    next(err);
    return;
  }
});

router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token , resetPasswordExpires: { $gt: Date.now()  } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('../forgot');
    }
    res.render('users/reset', {
      user: req.user
    });
  });
});

router.post('/reset/:token', async function(req, res) {
  try {
    await renderChangepass(req, res);
  } catch(err){
    next(err);
    return;
  }
});

module.exports = router;
