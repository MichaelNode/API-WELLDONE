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
    description: {
        type: String,
        index: true,
        required: true,
        default: ''
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
    password: String,
    image: String,
    state: Boolean,
    followers: [{
        type: Schema.ObjectId,
        ref: 'user'
    }],
    create_at : {
        type: Date,
        default: Date.now
    },
    last_modification: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    color: String,
    favArticles: Array
});

// function for hash a plain password
UserSchema.statics.hashPassword = (plainPassword) => {
    return bcrypt.hash(plainPassword, 14)
};

UserSchema.methods.getFollowing = async function () {
    return await this.model('user').find({followers: {$in: [this._id]}});
};

UserSchema.pre('remove', function (next) {
    this.model('articles').deleteMany({author: this._id}, next);
    next();

});

module.exports = mongoose.model('user', UserSchema);
