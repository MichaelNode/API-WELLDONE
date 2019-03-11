'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FavouriteSchema = Schema({
    user: {
        type: Schema.ObjectId, 
        ref: 'user'
    },
    article: {
        type: Schema.ObjectId, 
        ref: 'article'
    },
    create_at: String,
});

module.exports = mongoose.model('favourite', FavouriteSchema)