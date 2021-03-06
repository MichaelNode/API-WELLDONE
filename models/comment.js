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
        ref: 'articles'
    },
    content: String,
    create_at: {
        type: Date,
        default: Date.now
    },
});

CommentSchema.statics.listComments = async function(filters, pages, perPage){
    const query = this.model('comment').find(filters).sort({create_at: -1}).populate('user', '_id nick_name image');
    if(pages !== undefined && perPage !== undefined){
        query.skip((perPage * pages) - perPage);
        query.limit(perPage)
    }
    return await query.exec();
};

CommentSchema.statics.Count = function(filters){
    const query = Comment.find(filters);
    return query.countDocuments().exec();
}

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
