'use strict';

// Dependencies
const namedRoutes = require('../lib/namedRoutes');
const indexRouter = require('./index');
const usersRouter = require('./users');
const adminRouter = require('./admin');

// Router class
class Router {
    constructor(app) {

        app.use(namedRoutes.home, indexRouter);
        app.use(namedRoutes.users, usersRouter);
        app.use(namedRoutes.admin, adminRouter);

    }
}

module.exports = (params) => new Router(params);
