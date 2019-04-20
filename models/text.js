'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TextSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    article: {
        type: Schema.ObjectId,
        ref: 'articles'
    },
    content: String,
    create_at: {
        type: Date,
        default: Date.now
    },
});



const Text = mongoose.model('text', TextSchema);

module.exports = Text;
