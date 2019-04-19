'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const i18n = require('i18n');
const Comment = require('./comment');

var ArticleSchema = Schema({
    title: {
        type: String,
        index: true

    },
    file: String,
    file_type: String,
    file_name: String,
    url: String,
    url_type: String,
    summary: {
        type: String
    },
    shortDescription: {
        type: String,
        default: ''
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
    publi_date: {
        type: Date,
        require: false
    },
    author: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    article: {
        type: Schema.ObjectId,
        ref: 'articles'
    },
    last_modification: Date,

});

ArticleSchema.statics.allowedCategories = function () {
    return [
        'Culture',
        'Tech',
        'Health',
        'Music'
    ];
};

/**
 * Function for list articles
 * @param filters
 * @param sort
 * @param pages
 * @param perPage
 * @param stateAll
 * @returns {Promise<Array>}
 */
ArticleSchema.statics.list = async function (filters, sort, pages, perPage, stateAll = false) {
    // add filter for not show articles draft
    if(!filters.state && !stateAll) {
        filters.state = true;
    }
    // add filter for not show not published articles
    if(!filters.publi_date && !stateAll){
        filters.publi_date = {$lt: new Date()}
    }

    const query = Article.find(filters).populate('author', 'name nick_name image');
    query.sort(sort);
    if (pages !== undefined && perPage !== undefined) {
        query.skip((perPage * pages) - perPage);
        query.limit(perPage);
    }
    const articlesArr = await query.exec();

    // Add num comments to all articles and create a new array with this
    let articles = [];

    for (const article of articlesArr) {
        article.numComments = await article.getCommentsCount();
        article.shortDescription = article.getShortDescription();
        articles.push(article);
    }
    return articles;
}

/**
 * Function for get article total number
 * @param filters
 * @returns {Promise}
 * @constructor
 */
ArticleSchema.statics.Count = function (filters) {
    const query = Article.find(filters);
    return query.countDocuments().exec();
}

/**
 * Function for get formatted string from date for posts
 * @param date
 * @returns {string}
 */
ArticleSchema.methods.getFormattedDatePost = function () {
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
ArticleSchema.methods.getSlug = function () {
    let slug = this.title;
    let slugFormatted = slug.split(' ').join('-');
    return `${slugFormatted}-${this._id}`;
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
    if (!this.summary) return '';
    // trim the string to the maximum length
    let summary = this.summary.substr(0, maxLength);
    summary = summary.substr(0, Math.min(summary.length, summary.lastIndexOf(" ")));
    // re-trim if we are in the middle of a word
    return `${summary}...`;
}

/**
 * Function for get comments length of one article
 * @returns {Promise<void>}
 */
ArticleSchema.methods.getCommentsCount = async function () {
    return await Comment.Count({article: this._id});
}

const Article = mongoose.model('articles', ArticleSchema);

module.exports = Article;
