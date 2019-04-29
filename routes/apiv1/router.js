'use strict';

// Dependencies
const namedRoutes = require('../../lib/namedRoutes');
const loginRouter = require('./login');
const deleteUserRouter = require('./deleteUser');
const articleRouter = require('./article');
const userRouter = require('./users');
const favArticleRouter = require('./favArticleUser');
const followUser = require('./followUser');
const underlineTextRouter = require('./underlineText');


// Router class
class Router {
    constructor(app) {
        app.use(namedRoutes.apiv1_user, loginRouter);
        app.use(namedRoutes.apiv1_delete_user, deleteUserRouter);
        app.use(namedRoutes.apiv1_article , articleRouter);
        app.use(namedRoutes.apiv1_users , userRouter);
        app.use(namedRoutes.apiv1_fav_article, favArticleRouter);
        app.use(namedRoutes.apiv1_follow_user, followUser);
        app.use(namedRoutes.apiv1_underline_text, underlineTextRouter);
    }
}

module.exports = (params) => new Router(params);