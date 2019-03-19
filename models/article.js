'use stritc'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = Schema({
   title:{
        type: String, 
        index: true 
   },
   file: String,
   summary:{
        type: String, 
        index: true 
   },
   content: {
        type: String, 
        index: true 
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
       ref: 'users'
   },
   last_modification: Date,
   /* res_article: {
        type: Schema.ObjectId, 
        ref: 'article'
   } */
});

ArticleSchema.statics.allowedCategorys = function () {
    return [
        'CULTERE', 
        'TECH', 
        'HEALTH', 
        'MUSIC'
    ];
};

ArticleSchema.statics.listArticles = async function(filters, sort,pages,perPage){
     const query = Article.find(filters);
     query.sort(sort);
     if(pages !== undefined && perPage !== undefined){
		query.skip((perPage * pages) - perPage);
		query.limit(perPage)
	}	
     result = await query.exec();
     return result;
}

ArticleSchema.statics.Count = function(filters){
	const query = Article.find(filters);
	return query.count().exec();
}

const Article = mongoose.model('articles', ArticleSchema);

module.exports = Article;