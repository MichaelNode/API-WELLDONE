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
   author: {
       type: Schema.ObjectId, 
       ref: 'user'
   },
   last_modification: Date,
   res_article: {
        type: Schema.ObjectId, 
        ref: 'article'
   }
});

ArticleSchema.statics.allowedCategorys = function () {
    return [
        'CULTERE', 
        'TECH', 
        'HEALTH', 
        'MUSIC'
    ];
};

modulo.exports = mongoose.model('article', ArticleSchema);