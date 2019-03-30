'use strict';

// Dependencies
const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const Comment = require('../models/comment');
const createError = require('http-errors');
const {pagination} = require('../lib/utils');

/**
 *  GET article.
 */
router.get('/:user/:articleSlug/:page?', async function (req, res, next) {

    try {
        const id = Article.getIdFromSlug(req.params.articleSlug);
        const article = await Article.findOne({_id: id, state: true, publi_date: {$lt: new Date()}}).populate('author', '_id image nick_name');
        //if article not exists, return 404

        if(!article){
            next(createError(404));
            return;
        }
        const page = parseInt(req.params.page) || 1;
        const recordsPerPage = 5;
        const filters = {article: article._id};
        const comments = await Comment.listComments(filters, page, recordsPerPage);
        // get articles and calculate pagination
        const count = await Comment.Count(filters);
        const paginator = pagination(comments, count, page, recordsPerPage);

        res.render('articles/get.jade', {
            article: article,
            comments: comments,
            ...paginator
        })
    } catch(err){
        next(err);
    }
});

module.exports = router;
