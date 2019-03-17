'use strict'

const { check } = require('express-validator/check')
const User = require('../models/user');
const i18n = require('i18n');

module.exports.validation = [

    check('name').isAlpha().withMessage(i18n.__('El nombre solo puede contener letras')),
    check('last_name').isAlpha().withMessage(i18n.__('El apellido solo puede contener letras')),
    check('password').isLength({min: 8}).withMessage(i18n.__('La contraseña debe tener al menos 8 caracteres'))
    // Validate confirm password and password matches
        .custom((value, {req}) => {
            if (value !== req.body.confirmPassword) {
                // throw error if passwords do not match
                throw new Error(i18n.__('Password confirmation does not match password'));
            } else {
                return true;
            }
        }),
    check('email').isEmail().withMessage(i18n.__('El email no está correctamente escrito')).custom(value => {
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
    })
];

/**
 * Function for render register
 * @param res
 * @param name
 * @param last_name
 * @param nick_name
 * @param email
 * @param errors
 * @param flash
 */
module.exports.renderRegister = (res, {name = '', last_name = '', nick_name = '', email = '', errors = [], message = ''} = {}) => {
    console.log(errors);
    const params = {
        name: name,
        last_name: last_name,
        nick_name: nick_name,
        email: email,
        errors: errors,
        message: message
    };

    res.render('register', params);
};
