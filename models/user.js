'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: { 
        type: String,
        index: true,
    },
    last_name: { 
        type: String,
        index: true,
    },
    address: String,
    email: { 
        type: String,
        index: true, 
        unique: true 
    },
    nick_name: { 
        type: String,
        index: true,
        unique: true 
    },
    password: String,
    image: String,
    state: Boolean,
    create_at : { 
        type: Date, 
        default: Date.now 
    },
    last_modification: Date
});

module.exports = mongoose.model('user', UserSchema)

