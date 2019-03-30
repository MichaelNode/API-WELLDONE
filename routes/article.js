'use strict';

// Dependencies
const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const Comment = require('../models/comment');
const createError = require('http-errors');
const {renderArticleDetail, commentValidator} = require('../lib/articleService');
const { validationResult } = require('express-validator/check');
const {userAuth} = require('../lib/jwtAuth');

/**
 *  GET article.
 */
router.get('/:user/:articleSlug/:page?', async function (req, res, next) {

    try {
        const id = Article.getIdFromSlug(req.params.articleSlug);
        const article = await Article.findOne({_id: id, state: true, publi_date: {$lt: new Date()}}).populate('author', '_id image nick_name');

        // if article not exists, return 404
        if(!article){
            next(createError(404));
            return;
        }

        // render article detail
        await renderArticleDetail(req, res, article);

    } catch(err){
        next(err);
    }
});

/**
 *  POST article.
 */
router.post('/:user/:articleSlug/:page?', userAuth(), commentValidator, async function (req, res, next) {
    try {
        const id = Article.getIdFromSlug(req.params.articleSlug);
        const article = await Article.findOne({_id: id, state: true, publi_date: {$lt: new Date()}}).populate('author', '_id image nick_name');

        // if article not exists, return 404
        if(!article){
            next(createError(404));
            return;
        }

        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return await renderArticleDetail(req, res, article, {
                errors: validationErrors.array({onlyFirstError: true}),
                commentPosted: req.body.content
            });
        }

        // Save comment
        const comment = new Comment(req.body);
        comment.user = req.user;
        comment.article = article._id;
        await comment.save();

        // render article detail
        return res.redirect(`/article/${article.author.nick_name}/${article.getSlug()}`)

    } catch(err){
        await renderArticleDetail(req, res, article, {
            errors: [],
            commentPosted: req.body.content
        });
    }
});


module.exports = router;
