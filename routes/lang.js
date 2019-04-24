'use strict'

const express = require('express')
const router = express.Router()

router.get('/:locale', (req, res, next) => {
    const locale = req.params.locale
    console.log('entro a lang',locale)
    const referer = req.get('referer')
    res.cookie('devrock-lang', locale, {
        expires: new Date(Date.now()+31557600000), //1 Year
        httpOnly: true
    })
    res.redirect(referer)
})

module.exports = router