var express = require('express');

var router = express.Router();
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
const User = require('../models/user');
const loadTemplate = require('../lib/email');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/forgot', function(req, res) {
  res.render('users/forgot', {
    user: 'req.user'
  });
});

router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },

 
   
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    
    function(token, user, done) {
    const context = [{
      token,
      user,
    }];
    console.log(context)
    loadTemplate.loadTemplate('forgot', context).then((results, err) => {
      return Promise.all(results.map((result) => {
        loadTemplate.sendEmail({
              to: result.context.user.email,
              from: 'Me :)',
              subject: 'hola',
              html: result.email.html,
              attachments: [{
                filename: 'blog-1.jpg',
                path: './public/images/blog-1.jpg',
                cid: 'blog',
                contentDisposition: "inline"
            }],
          });
          req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
      }));
    }).then(() => {
        console.log('Yay!');
    })
  } 
 
  ], function(err) {
    if (err) return next(err);
    res.redirect('forgot');
  });
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

router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('../forgot');
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
            done(err, user);
        });
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'heremail@gmail.com',
          pass: 'here_pass.'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'hereemail@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
});

module.exports = router;
