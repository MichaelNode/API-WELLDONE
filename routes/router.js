'use strict';

// Dependencies
const namedRoutes = require('../lib/namedRoutes');
const indexRouter = require('./index');
const usersRouter = require('./users');
const adminRouter = require('./admin');
const apiRouter = require('./apiv1/router');

// Router class
class Router {
    constructor(app) {

        app.use(namedRoutes.home, indexRouter);
        app.use(namedRoutes.users, usersRouter);
        app.use(namedRoutes.admin, adminRouter);
        apiRouter(app);
    }
}

module.exports = (params) => new Router(params);
