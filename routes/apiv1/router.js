'use strict';

// Dependencies
const namedRoutes = require('../../lib/namedRoutes');
const loginRouter = require('./login');

// Router class
class Router {
    constructor(app) {
        app.use(namedRoutes.apiv1_user, loginRouter);
    }
}

module.exports = (params) => new Router(params);
