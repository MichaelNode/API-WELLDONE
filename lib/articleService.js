'use strict'
const Articles = require('../models/article');
const { check } = require('express-validator/check')
const User = require('../models/user');
const i18n = require('i18n');
const path = require("path");


module.exports.validation = [
   
    check('title').not().isEmpty().withMessage(i18n.__('Debes indicar un titulo')),
    check('summary').not().isEmpty().withMessage(i18n.__('Debes indicar un resumen')),
    check('content').not().isEmpty().withMessage(i18n.__('Debes indicar un contenido')),
    check('state').not().isEmpty().withMessage(i18n.__('Debes indicar un estado')),
    check('category').not().isEmpty().withMessage(i18n.__('Debes indicar una categoría')),
    
];


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

    // get articles and calculate pagination
    const recordsPerPage = 15;
    const articles = await Articles.listArticles(filters, sort, page, recordsPerPage);
    const count = await Articles.Count(filters);
    const pageButtonCount = Math.ceil(count / recordsPerPage);
    const paginationNo = 0;

    // options for send to view
    const options = {
        articles,
        count,
        recordsPerPage,
        pageButtonCount,
        paginationNo,
        current: page,
        pages: Math.ceil(count / recordsPerPage)
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
