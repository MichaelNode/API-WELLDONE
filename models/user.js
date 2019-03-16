'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    /* article: [{
        type: Schema.ObjectId, 
        ref: 'article'
    }], */
    password: String,
    image: String,
    state: Boolean,
    create_at : { 
        type: Date, 
        default: Date.now 
    },
    last_modification: Date
});

UserSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 10)
}

module.exports = mongoose.model('user', UserSchema)

