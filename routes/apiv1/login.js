// Dependencies
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getUserFromRequestLogged } = require('../../lib/jwtAuth');
var multer  = require('multer');
var upload = multer();

router.post('/', upload.any(), async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await getUserFromRequestLogged(req);
    // if no user then return an error
    if (!user) {
      res.status(400);
      res.json({'success': false, 'error': res.__('Invalid credentials')});
      return;
    }

    // get jwt token from this user
    jwt.sign({_id: user.id}, process.env.JWT_SECRET, {
      expiresIn: '1d'
    }, (err, token) => {
      // check if error exists
      if (err) {
        res.json({'success': false, 'error': err});
        return;
      }
      console.log(user);
      // save user in session
      req.session.user = {_id: user._id};
      // return token with a success response
      res.json({'success': true, token: token});
    });
  }catch (err) {
    console.log(err);
    next(err);
  }

});

module.exports = router;
