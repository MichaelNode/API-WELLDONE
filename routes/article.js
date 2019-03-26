'use strict';

// Dependencies
const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const createError = require('http-errors');

/**
 *  GET article.
 */
router.get('/:user/:articleSlug', async function (req, res, next) {

    try {
        const id = Article.getIdFromSlug(req.params.articleSlug);
        const article = await Article.findOne({_id: id, state: true, publi_date: {$lt: new Date()}}).populate('author', '_id image nick_name');

        if(!article){
            next(createError(404));
            return;
        }

        res.render('articles/get.jade', {
            article: article
        })
    } catch(err){
        next(err);
    }
});

module.exports = router;
