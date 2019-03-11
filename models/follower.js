'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FollowerSchema = Schema({
    user: {
        type: Schema.ObjetId, 
        ref: 'user'
    },
    follower: {
        type: Schema.ObjetId,
        ref: 'user'
    },
    create_at : { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('follower', FollowerSchema);
