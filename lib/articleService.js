const Articles = require('../models/article');

/**
 * Function for render articles with filters
 * @param req
 * @param res
 * @param user
 * @returns {Promise<void>}
 */
module.exports.renderArticles = async (req, res, user = null) => {
    const filters = {};
    filters.state = true;
    const sort = 'publi_date';
    const page = parseInt(req.params.page) || 1;
    const category = req.query.category || undefined;

    // add categories and user to filters
    if (category) {
        filters.category = category;
    }
    if(user) {
        filters.author = user._id;
    }

    // get articles and calculate pagination
    const recordsPerPage = 1;
    const articles = await Articles.listArticles(filters, sort, page, recordsPerPage);
    const count = await Articles.Count(filters);
    const pageButtonCount = Math.ceil(count / recordsPerPage);
    const lower_limit = (parseInt((page) / pageButtonCount) * pageButtonCount) + 1;
    const upper_limit = lower_limit * pageButtonCount;
    const paginationNo = lower_limit - 1;

    // options for send to view
    const options = {
        articles,
        count,
        recordsPerPage,
        pageButtonCount,
        lower_limit,
        upper_limit,
        paginationNo,
        current: page,
        pages: Math.ceil(count / recordsPerPage)
    };

    // add category and user to options if exists
    if(category){
        options.category = category
    }

    if(user){
        options.userBlog = user;
    }

    // render
    res.render('articles/articles', options);
};
