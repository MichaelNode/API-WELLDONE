'use strict'
const Articles = require('../models/article');
const { check } = require('express-validator/check')
const User = require('../models/user');
const i18n = require('i18n');

module.exports.validation = [
   
    check('title').not().isEmpty().withMessage(i18n.__('El nombre solo puede contener letras')),
    check('summary').not().isEmpty().withMessage(i18n.__('El apellido solo puede contener letras')),
    check('content').not().isEmpty().withMessage(i18n.__('Debes indicar una descripción')),
    check('state').not().isEmpty().withMessage(i18n.__('La contraseña debe tener al menos 8 caracteres')),
    check('category').not().isEmpty().withMessage(i18n.__('La contraseña debe tener al menos 8 caracteres')),
    check('file_type').contains('image/jpg','image/jpeg','image/png').withMessage(i18n.__('tipo de imagen no valida')), 

  /*   check('email').isEmail().withMessage(i18n.__('El email no está correctamente escrito')).custom(value => {
        // validate eamil no exists
        return User.findOne({email: value}).then(user => {
            if (user) {
                return Promise.reject(i18n.__('E-mail already in use'));
            }
        })
    }),
    check('nick_name').not().isEmpty().withMessage('El nickname no puede estar vacío').custom(value => {
        // validate eamil no exists
        return User.findOne({nick_name: value}).then(user => {
            if (user) {
                return Promise.reject(i18n.__('Nick name already in use'));
            }
        })
    }) */
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
