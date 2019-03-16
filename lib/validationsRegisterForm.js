'use strict'

const { check } = require('express-validator/check')

const validationsRegisterForm = [

    check('name').isAlpha().withMessage('El nombre solo puede contener letras'),
    check('last_name').isAlpha().withMessage('El apellido solo puede contener letras'),
    check('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    check('email').isEmail().withMessage('El email no está correctamente escrito'),
    check('nick_name').not().isEmpty().withMessage('El nickname no puede estar vacío')
]

module.exports = validationsRegisterForm