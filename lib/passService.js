const User = require('../models/user');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
const loadTemplate = require('../lib/email');


renderForgot = async (req, res,next) => {
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
        loadTemplate.loadTemplate('forgot_pass', context).then((results, err) => {
          return Promise.all(results.map((result) => {
            loadTemplate.sendEmail({
                  to: result.context.user.email,
                  from: 'WellDone',
                  subject: 'Password rest',
                  html: result.email.html,
                  attachments: [{
                    filename: 'blog-1.jpg',
                    path:  './public/images/blog1.jpg',
                    cid: 'blog',
                    contentDisposition: "inline"
                }],
              });
              req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
              done(err, 'done');
          }));
        }).then(() => {
            console.log('send email!');
        })
      } 
      ], function(err) {
        if (err) return next(err);
        res.redirect('forgot');
    });
};

renderChangepass = async (req, res) => {
    async.waterfall([
        function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, async function(err, user) {
            if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('../forgot');
            }
            user.password =  await User.hashPassword(req.body.password);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.save(function(err) {
                done(err, user);
            });
        });
        },
        function(user, done) {
        const context = [{
            user
        }];
        loadTemplate.loadTemplate('change_pass', context).then((results, err) => {
            return Promise.all(results.map((result) => {
            loadTemplate.sendEmail({
                    to: result.context.user.email,
                    from: 'WellDone',
                    subject: 'Your password has been changed',
                    html: result.email.html,
                    attachments: [{
                    filename: 'blog-".jpg',
                    path:  './public/images/blog-2.jpg',
                    cid: 'blog',
                    contentDisposition: "inline"
                }],
                });
                req.flash('success', 'Success! Your password has been changed.');
                done(err, 'done');
            }));
        })}
    ], function(err) {
        res.redirect('/');
    });
};

module.exports = {
    renderForgot,
    renderChangepass 
}
