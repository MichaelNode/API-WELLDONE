// Dependencies
const jwt = require('jsonwebtoken');
const i18n = require('i18n');
const User = require('../models/user');
const bcrypt = require('bcrypt');

/**
 * Middleware for check if user is authenticated
 * @returns {Function}
 */
module.exports.jwtAuth = () => (req, res, next) => {
  const token = req.query.token || req.body.token || req.session.token || req.get('token');

  // if token are note provided, then return an error
  if(!token){
    const err = new Error(i18n.__('You are not authenticated'));
    next(err);
    return;
  }

  // verify jwt token
  jwt.verify(token, process.env.JWT_SECRET, function (err, tokenDecoded) {
    if(err){
      next(err);
      return;
    }
    // Assign user in request
    req.user = tokenDecoded._id;
    next();
  })
};


/**
 * Function for get user from login request
 * @param req
 * @returns {Promise<*>}
 */
module.exports.getUserFromRequestLogged = async (req) => {

  // get email and password
  const email = req.body.email || '';
  const password = req.body.password;

  // get user from database with this email
  const user = await User.findOne({email: email});

  // check user exists and password is valid
  if (!user || !await bcrypt.compare(password, user.password)) {
    return false;
  }
  return user;
};

/**
 * Function for know if user is logged
 * @param req
 * @returns {String|*}
 */
module.exports.isLogged = (req) => {
  return req.session.user && req.session.user._id;
};
