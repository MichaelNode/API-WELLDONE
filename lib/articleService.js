
'use strict'

const Articles = require('../models/article');
const User = require('../models/user');
const { check } = require('express-validator/check')
const i18n = require('i18n');
const {pagination} = require('../lib/utils');
const Comment = require('../models/comment');

const USER_MENTION_REGEX = new RegExp(/(\s|>)([@#][\w_-]+)/, "g");

module.exports.validation = [

    check('title').not().isEmpty().withMessage(i18n.__('Debes indicar un titulo')),
    check('summary').not().isEmpty().withMessage(i18n.__('Debes indicar un resumen')),
    check('content').not().isEmpty().withMessage(i18n.__('Debes indicar un contenido')),
    check('state').not().isEmpty().withMessage(i18n.__('Debes indicar un estado')),
    check('category').not().isEmpty().withMessage(i18n.__('Debes indicar una categoría')),
    check('author').not().isEmpty().withMessage(i18n.__('Debes indicar un author')).custom((value, {req}) => {
        return User.findOne({_id: value}).then(user => {
            if (user) {
                return true
            }else  {
                throw new Error(i18n.__('El usuario no existe'));
            }
        })
    }),
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
  const options = {};
  filters.state = true;
  filters.publi_date = {$lt: new Date()};

  const category = req.query.category || undefined;
  const favourites = req.query.favourites || undefined;

  //Show user favourite articles
  if (favourites) {
    const userID = req.session.user._id;
    const user = await User.findOne({_id: userID});
    filters._id = user.favArticles
  }

  // add categories and user to filters
  if (category) {
    filters.category = category;
  }
  if (user) {
    filters.author = user._id;
    options.userBlog = user;
    options.following = await user.getFollowing();
  }

  // add category and user to options if exists
  if (category) {
    options.category = category
  }

  // get articles filtered and render them
  const articlesFiltered = await this.filter(req, res, filters, options);
  res.render('articles/articles', articlesFiltered);
};

/**
 * Function for get articles filterd
 * @param req
 * @param res
 * @param filters
 * @param extraOptions
 * @param stateAll
 * @returns {Promise<void>}
 */
module.exports.filter = async (req, res, filters = {}, extraOptions = {}, stateAll = false) => {
  const page = parseInt(req.params.page) || 1;
  const recordsPerPage = 15;
  const order = req.query.order || '-1';
  const category = filters.category;
  const favourites = req.query.favourites

  const sort = {'publi_date': order};

  // get articles and calculate pagination
  const articles = await Articles.list(filters, sort, page, recordsPerPage, stateAll);
  const count = await Articles.Count(filters);

  const paginator = pagination(articles, count, page, recordsPerPage);

  // articles filtered with pagination
  return {
    articles,
    order,
    favourites,
    categorySelected: category,
    ...paginator,
    ...extraOptions
  };
};

/**
 * Function for render article detail
 * @param req
 * @param res
 * @param article
 * @param errors
 * @param userId
 * @param commentPosted
 * @returns {Promise<void>}
 */
module.exports.renderArticleDetail = async (req, res, article,  userId, text, {errors = [], commentPosted = ''} = {}) => {
  
  const page = parseInt(req.params.page) || 1;
  const recordsPerPage = 5;
  const filters = {article: article._id};
  const comments = await Comment.listComments(filters, page, recordsPerPage);
  // get articles and calculate pagination
  const count = await Comment.Count(filters);
  const paginator = pagination(comments, count, page, recordsPerPage);

  // Add bookmark class depends on user logged
  let bookmark = 'fas';
  let color = ''
  try {
    const user = userId ? await User.findOne({_id: userId}) : null;
    color = user.color
    if (user && user.favArticles.indexOf(article._id) === -1) {
      bookmark = 'far'
    }

  } catch (err) {
    next(err);
    return;
  }
  article.numComments = await article.getCommentsCount();

  res.render('articles/get.jade', {
    article: article,
    comments: comments,
    errors: errors,
    commentPosted: commentPosted,
    bookmark: bookmark,
    text: text,
    /* color: color, */
    ...paginator
  })
};

/**
 * Function for get all users mentioned in one string
 * @param content
 * @returns {Promise<Array>}
 */
module.exports.getUserMention = async (content) => {
  const users = [];
  const mentions = content.match(USER_MENTION_REGEX) || [];
  // Extract all users of mentions array
  for (const mention of mentions) {
    const mentionSanitized = mention.trim();
    // remove @ for get user nickname
    const nickName = mentionSanitized.replace(/@|>/g, '');
    console.log(nickName);
    const user = await User.findOne({nick_name: nickName});
    // if no user continue next loop
    if(!user){
      continue;
    }
    users.push(user);
  }
  return users;
};

/**
 * Validator for new comments
 * @type {(this | *)[]}
 */
module.exports.commentValidator = [
  check('content').isString().isLength({min: 1}).withMessage(i18n.__('You can not upload an empty comment')),
];

