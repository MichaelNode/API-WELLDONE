"use strict";

// Dependencies
const Articles = require('../models/article');
const {pagination} = require('../lib/utils');
const i18n = require('i18n');
const {check} = require('express-validator/check');
const Comment = require('../models/comment');

/**
 * Function for render articles with filters
 * @param req
 * @param res
 * @param user
 * @returns {Promise<void>}
 */
module.exports.renderArticles = async (req, res, user = null) => {
    const filters = {};
    filters.state = true;
    filters.publi_date = {$lt: new Date()};
    const sort = 'publi_date';
    const page = parseInt(req.params.page) || 1;
    const category = req.query.category || undefined;

    // add categories and user to filters
    if (category) {
        filters.category = category;
    }
    if(user) {
        filters.author = user._id;
    }

    const recordsPerPage = 15;
    // get articles and calculate pagination
    const articlesArr = await Articles.listArticles(filters, sort, page, recordsPerPage);
    const count = await Articles.Count(filters);

    // Add num comments to all articles and create a new array with this
    let articles = [];

    for (const article of articlesArr){
        article.numComments =  await article.getCommentsCount();
        articles.push(article);
    }

    const paginator = pagination(articles, count, page, recordsPerPage);

    // options for send to view
    const options = {
        articles,
        ...paginator
    };

    // add category and user to options if exists
    if(category){
        options.category = category
    }

    if(user){
        options.userBlog = user;
        options.following = await user.getFollowing();
    }

    // render
    res.render('articles/articles', options);
};

/**
 * Function for render article detail
 * @param req
 * @param res
 * @param article
 * @param errors
 * @param commentPosted
 * @returns {Promise<void>}
 */
module.exports.renderArticleDetail = async (req, res, article, {errors = [], commentPosted = ''} = {}) => {
    const page = parseInt(req.params.page) || 1;
    const recordsPerPage = 5;
    const filters = {article: article._id};
    const comments = await Comment.listComments(filters, page, recordsPerPage);
    // get articles and calculate pagination
    const count = await Comment.Count(filters);
    const paginator = pagination(comments, count, page, recordsPerPage);
    article.numComments =  await article.getCommentsCount();

    res.render('articles/get.jade', {
        article: article,
        comments: comments,
        errors: errors,
        commentPosted: commentPosted,
        ...paginator
    })
};

/**
 * Validator for new comments
 * @type {(this | *)[]}
 */
module.exports.commentValidator = [
    check('content').isString().isLength({min: 1}).withMessage(i18n.__('You can not upload an empty comment')),
];

