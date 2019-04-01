'use strict';

// Dependencies
const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const User = require('../models/user');

router.get('/:type?', async (req, res, next) => {
    // get model for search
    const filteredModel = req.params.type === 'user' ? User : Article;
    const sort = filteredModel instanceof User ? 'followers' : 'publi_date';
    const filters = {};
    const filter = filteredModel instanceof User ? 'name' : 'title';
    const type = filteredModel instanceof User ? 'user' : 'article';
    const page = parseInt(req.params.page) || 1;
    const recordsPerPage = 15;
    const text = req.query.text;

    // get models that have a coincidence
    filters[filter] = new RegExp(text, 'i');
    const models = await filteredModel.list(filters, sort, page, recordsPerPage);
    res.render('search/search', {
        models: models,
        type: type,
        text: text
    });
});

module.exports = router;
