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
    filters.publi_date = {$lt: new Date()};
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
    const recordsPerPage = 15;
    const articles = await Articles.listArticles(filters, sort, page, recordsPerPage);
    const count = await Articles.Count(filters);
    const pageButtonCount = Math.ceil(count / recordsPerPage);
    const paginationNo = 0;

    // options for send to view
    const options = {
        articles,
        count,
        recordsPerPage,
        pageButtonCount,
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
        options.following = await user.getFollowing();
    }

    // render
    res.render('articles/articles', options);
};

