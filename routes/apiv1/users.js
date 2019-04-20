"use strict";

// Dependencies
const express = require('express');
const router = express.Router();
const {jwtAuth} = require('../../lib/jwtAuth');
const User = require('../../models/user');

/**
 * Get articles of user logged
 */
router.get('/', jwtAuth(), async (req, res, next) => {
  const users = await User.find({}, 'nick_name _id');
  res.json({users: users});
});

module.exports = router;