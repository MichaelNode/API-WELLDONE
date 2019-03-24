'use strict';

// Dependencies
const namedRoutes = require('../lib/namedRoutes');
const {anonymousAuth} = require('../lib/jwtAuth');
const indexRouter = require('./index');
const usersRouter = require('./users');
const adminRouter = require('./admin');
const registerRouter = require('./register');
const articleRouter = require('./article');
const apiRouter = require('./apiv1/router');
const designRouter = require('./design');

// Router class
class Router {
    constructor(app) {

        app.use(namedRoutes.home,  indexRouter);
        app.use(namedRoutes.users, usersRouter);
        app.use(namedRoutes.admin, adminRouter);
        app.use(namedRoutes.articles, articleRouter);
        app.use(namedRoutes.design, designRouter);
        app.use(namedRoutes.register, anonymousAuth(), registerRouter);
        apiRouter(app);
    }
}

module.exports = (params) => new Router(params);
