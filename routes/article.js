'use strict';

// Dependencies
const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const Comment = require('../models/comment');
const createError = require('http-errors');
const {renderArticleDetail, commentValidator} = require('../lib/articleService');
const { validationResult } = require('express-validator/check');
const {userAuth} = require('../lib/jwtAuth');
const {sendToRoom} = require('../lib/socket');
const ioEmitter = require('socket.io-emitter')({host: '127.0.0.1', port: 6379});
const notifier = require('node-notifier');
var open = require('open');
/**
 *  GET article.
 */
router.get('/:user/:articleSlug/:page?', async function (req, res, next) {

    try {
        const id = Article.getIdFromSlug(req.params.articleSlug);
        const article = await Article.findOne({_id: id, state: true, publi_date: {$lt: new Date()}}).populate('author', '_id image nick_name');
        const userId = req.session.user;
        const user = req.session.user;
        //io.emit('Hola','probando') 
        // if article not exists, return 404
    
        //ioEmitter.emit('notification-article', 'mensaje de prueba');
        //ioEmitter.emit('chat message', 'rrrrrrSDFSDFDS');
        if(!article){
            next(createError(404));
            return;
        }

   
/* 
          notifier.notify(
            {
              title: 'My awesome title 45',
              message: 'Hello from node, Mr. User! , http://localhost:3002/articles',
              //icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons)
              sound: true, // Only Notification Center or Windows Toasters
              wait: true, // Wait with callback, until user action is taken against notification
              open: 'http://localhost:3002/articles'
            }
            
          ); */
          
          
          
        sendToRoom('test', 'login', user);
        // render article detail
        await renderArticleDetail(req, res, article, user);

    } catch(err){
        next(err);
    }
});

/**
 *  POST article.
 */
router.post('/:user/:articleSlug/:page?', userAuth(), commentValidator, async function (req, res, next) {
    try {
        const id = Article.getIdFromSlug(req.params.articleSlug);
        const article = await Article.findOne({_id: id, state: true, publi_date: {$lt: new Date()}}).populate('author', '_id image nick_name');

        // if article not exists, return 404
        if(!article){
            next(createError(404));
            return;
        }

        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return await renderArticleDetail(req, res, article, req.user, {
                errors: validationErrors.array({onlyFirstError: true}),
                commentPosted: req.body.content
            });
        }

        // Save comment
        const comment = new Comment(req.body);
        comment.user = req.user;
        comment.article = article._id;
        await comment.save();

        const user = req.user;
        // TODO: HACER ESTO
        // user.followers.forEach(follower => {
        //     io.to(follower._id).emit('Hola', 'Probando desde article');
        // });

        // render article detail
        return res.redirect(`/article/${article.author.nick_name}/${article.getSlug()}`)

    } catch(err){
        await renderArticleDetail(req, res, article, {
            errors: [],
            commentPosted: req.body.content
        });
    }
});


module.exports = router;
