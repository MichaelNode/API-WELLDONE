'use strict';

// Dependencies
const namedRoutes = require('../../lib/namedRoutes');
const loginRouter = require('./login');
const deleteUserRouter = require('./deleteUser');

// Router class
class Router {
    constructor(app) {
        app.use(namedRoutes.apiv1_user, loginRouter);
        app.use(namedRoutes.apiv1_delete_user, deleteUserRouter);
    }
}

module.exports = (params) => new Router(params);
