'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const i18n = require('i18n');

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
    shortDescription: {
        type: String,
        default: ''
    },
   content: {
        type: String,
        index: false
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
     const query = Article.find(filters).populate('author', 'name nick_name image');
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

/**
 * Function for get formatted string from date for posts
 * @param date
 * @returns {string}
 */
ArticleSchema.methods.getFormattedDatePost = function() {
    // get difference in milliseconds
    const date = this.create_at;
    const dateNow = new Date();
    const milliseconds = Math.floor(dateNow.getTime() - date.getTime());
    // get number of days
    const day = 1000 * 60 * 60 * 24;
    const days = milliseconds / day;
    // if have 1 or more days format and return it
    if (days >= 1) {
        let lastString = i18n.__('días');
        if (Math.floor(days) === 1) {
            lastString = i18n.__('día');
        }
        return `${i18n.__('Hace')} ${Math.floor(days)} ${lastString}`;
    }
    // Get in hours
    const hours = days * 24;
    if (hours >= 1) {
        let lastString = i18n.__('horas');
        if (Math.floor(hours) === 1) {
            lastString = i18n.__('hora');
        }
        return `${i18n.__('Hace')} ${Math.floor(hours)} ${lastString}`;
    }

    // get in minutes
    const minutes = hours * 60;
    if (minutes >= 1) {
        let lastString = i18n.__('minutos');
        if (Math.floor(minutes) === 1) {
            lastString = i18n.__('minuto');
        }
        return `${i18n.__('Hace')} ${Math.floor(minutes)} ${lastString}`;
    }

    // if not then return default string
    return i18n.__('Hace menos de 1 minuto');
};

/**
 * Function for get url slug of one article
 * @returns {string}
 */
ArticleSchema.methods.getSlug = function(){
    let slug = this.title;
    let slugFormatted = slug.split(' ').join('-');
    return `${slugFormatted }-${this._id}`;
}

/**
 * Function for get id from slug
 * @param slug
 * @returns {*}
 */
ArticleSchema.statics.getIdFromSlug = function (slug) {
    const slugArray = slug.split('-');
    return slugArray[slugArray.length - 1];
}

/**
 * Function for get short description of article
 * @param maxLength
 * @returns {string}
 */
ArticleSchema.methods.getShortDescription = function (maxLength = 100) {
    if(!this.shortDescription) return '';
    // trim the string to the maximum length
    let shortDescription = this.shortDescription.substr(0, maxLength);
    shortDescription = shortDescription.substr(0, Math.min(shortDescription.length, shortDescription.lastIndexOf(" ")));
    // re-trim if we are in the middle of a word
    return `${shortDescription}...`;
}

ArticleSchema.methods.favArticle = function () {
    console.log('entra en el favArticle')
}

const Article = mongoose.model('articles', ArticleSchema);

module.exports = Article;
