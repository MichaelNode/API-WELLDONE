'use strict';

// Dependencies
const namedRoutes = require('../../lib/namedRoutes');
const loginRouter = require('./login');
const deleteUserRouter = require('./deleteUser');
const articleRouter = require('./article');
const favArticleRouter = require('./favArticleUser');


// Router class
class Router {
    constructor(app) {
        app.use(namedRoutes.apiv1_user, loginRouter);
        app.use(namedRoutes.apiv1_delete_user, deleteUserRouter);
        app.use(namedRoutes.apiv1_article , articleRouter);
        app.use(namedRoutes.apiv1_fav_article, favArticleRouter)
    }
}

module.exports = (params) => new Router(params);
