'use strict'

const bcrypt = require('bcrypt');

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
        unique: true,
        required: true
    },
    nick_name: {
        type: String,
        index: true,
        unique: true,
        required: true
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
    last_modification: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

// function for hash a plain password
UserSchema.statics.hashPassword = (plainPassword) => {
    return bcrypt.hash(plainPassword, 14)
};

module.exports = mongoose.model('user', UserSchema)

