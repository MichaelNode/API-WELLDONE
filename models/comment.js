'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'users'
    },
    article: {
        type: Schema.ObjectId,
        ref: 'articles'
    },
    content: String,
    create_at: String,
});

const Comment = mongoose.model('comment', CommentSchema)

module.exports = Comment;
