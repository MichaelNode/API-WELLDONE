'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const User = require('./user');
const i18n = require('i18n');

var ArticleSchema = Schema({
     title:{
        type: String,
        index: true
     },
     file_type: String, 
     file_name: String,
     url: String,
     summary:{
          type: String
     },
     content: {
          type: String
     },
     state: {
          type: Boolean,
          index: true
     },
     category: {
          type: String,
          index: true
     },
     create_at: {
          type: Date,
          default: Date.now
     },
     publi_date: Date,
     author: {
          type: Schema.ObjectId,
          ref: 'user'
     },
     last_modification: Date,
     /* res_article: {
          type: Schema.ObjectId,
          ref: 'article'
     } */
});

ArticleSchema.statics.allowedCategories = function () {
    return [
        'CULTURE',
        'TECH',
        'HEALTH',
        'MUSIC'
    ];
};

ArticleSchema.statics.listArticles = async function(filters, sort,pages,perPage){
     const query = Article.find(filters).populate('author', 'name nick_name');
     query.sort(sort);
     if(pages !== undefined && perPage !== undefined){
		query.skip((perPage * pages) - perPage);
		query.limit(perPage)
	}
     return await query.exec();
}

ArticleSchema.statics.Count = function(filters){
	const query = Article.find(filters);
	return query.count().exec();
}

const Article = mongoose.model('articles', ArticleSchema);

module.exports = Article;
