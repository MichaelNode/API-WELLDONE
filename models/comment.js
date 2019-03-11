'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = Schema({
    user: {
        type: Schema.ObjectId, 
        ref: 'user'
    },
    article: {
        type: Schema.ObjectId, 
        ref: 'article'
    },
    content: String,
    create_at: String,
});

module.exports = mongoose.model('comment', CommentSchema)

