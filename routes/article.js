'use strict';



const express = require('express');
const router = express.Router();
const Articles = require('../models/article')



/* GET anuncios page. */
router.get('/', async function (req, res, next) {
    try {
        const filters = {}
        const sort =  'create_at';
        filters.state = true;
        const articles = await Articles.listArticles(filters, sort); 
        res.render('articles', { articles });
    } catch(err){ 
        return res.next(err);
    }
});

module.exports = router;