'use strict';

// Dependencies
const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const User = require('../models/user');
const {pagination} = require('../lib/utils');

router.get('/:type?/:page?', async (req, res, next) => {
  // get model for search
  const filteredModel = req.params.type === 'user' ? User : Article;
  // get sort field ASC or DESC
  const sortField = filteredModel === User ? 'followers' : 'publi_date';
  const order = req.query.order || '-1';
  const sort = {};
  sort[sortField] = order;
  // add filters
  const filters = {};
  const filter = filteredModel === User ? 'nick_name' : 'title';
  // get type
  const type = filteredModel === User ? 'user' : 'article';
  // get paginator required fields
  const page = parseInt(req.params.page) || 1;
  const recordsPerPage = 15;
  // get search text
  const text = req.query.text;

  // get models that have a coincidence
  filters[filter] = new RegExp(text, 'i');
  const models = await filteredModel.list(filters, sort, page, recordsPerPage);
  const count = await filteredModel.Count(filters);
  // create paginator
  const paginator = pagination(models, count, page, recordsPerPage);

  res.render('search/search', {
    models,
    searchType: type,
    searchText: text,
    order,
    ...paginator,
  });
});

module.exports = router;
