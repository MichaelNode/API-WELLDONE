'use strict';

const express = require('express');
const router = express.Router();
const Articles = require('../models/article')


/* GET anuncios page. */
router.get('/:page?', async function (req, res, next) {

    try {
        const filters = {}
        filters.state = true;
        const sort =  'publi_date';
        const page =  parseInt(req.params.page) || 1;
        const recordsPerPage = 6;
        const articles = await Articles.listArticles(filters, sort,page,recordsPerPage); 
        const count = await Articles.Count(filters);
        const pageButtonCount =  Math.ceil( count / recordsPerPage);
        const lower_limit = (parseInt((page)/pageButtonCount) * pageButtonCount) + 1
        const upper_limit = lower_limit * pageButtonCount;
        const paginationNo = lower_limit - 1
     
        console.log(count, parseInt(page) , recordsPerPage ,pageButtonCount ,lower_limit ,  upper_limit  , paginationNo )
        res.render('articles', { 
            articles:articles,
            count, 
            recordsPerPage, 
            pageButtonCount,
            lower_limit , 
            upper_limit , 
            paginationNo, current: page, pages: Math.ceil( count / recordsPerPage)  });
    } catch(err){ 
        return res.next(err);
    }
});

module.exports = router;