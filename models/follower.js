'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FollowerSchema = Schema({
    user: {
        type: Schema.ObjetId, 
        ref: 'users'
    },
    follower: {
        type: Schema.ObjetId,
        ref: 'users'
    },
    create_at : { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('follower', FollowerSchema);
