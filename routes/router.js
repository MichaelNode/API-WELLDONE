'use strict';

// Dependencies
const namedRoutes = require('../lib/namedRoutes');
const indexRouter = require('./index');
const usersRouter = require('./users');
const adminRouter = require('./admin');
const registerRouter = require('./register');

// Router class
class Router {
    constructor(app) {

        app.use(namedRoutes.home, indexRouter);
        app.use(namedRoutes.users, usersRouter);
        app.use(namedRoutes.admin, adminRouter);
        app.use(namedRoutes.register, registerRouter);

    }
}

module.exports = (params) => new Router(params);
