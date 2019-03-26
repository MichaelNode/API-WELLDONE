'use strict';

const express = require('express');
const router = express.Router();
const {renderArticles} = require('../lib/articleService');
const User = require('../models/user');
const createError = require('http-errors');


/**
 *  GET articles page.
 */
router.get('/:page?', async function (req, res, next) {

    try {
        await renderArticles(req, res);
    } catch(err){
        next(err);
    }
});


/**
 * GET Route for get user articles filtered
 */
router.get('/user/:nick/:page?', async function (req, res, next) {
    try {
        // get user by nick
        const nick = req.params.nick;
        const user = await User.findOne({nick_name: nick});
        // if no user, then return 404
        if(!user){
            next(createError(404));
            return;
        }

        // show user articles
        await renderArticles(req, res, user);
    } catch(err){
        next(err);
    }
});

module.exports = router;
