'use strict';



const express = require('express');
const router = express.Router();
const Articles = require('../models/article')



/* GET anuncios page. */
router.get('/', async function (req, res, next) {
    try {
        const filters = {}
        filters.state = true;
        const articles = await Articles.listArticles(filters); 
        res.render('articles', { articles });
    } catch(err){ 
        return res.next(err);
    }
});

module.exports = router;