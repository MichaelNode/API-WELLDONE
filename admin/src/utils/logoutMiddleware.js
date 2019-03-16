// Dependencies
import StorageWrapper from './StorageWrapper';
const jwtDecode = require('jwt-decode');

/**
 * Middleware for logout if session expires
 * @param store
 * @returns {function(*): Function}
 */
export const checkTokenExpirationMiddleware = store => next => action => {
    const token = StorageWrapper.getValue('token');
    if (token && (jwtDecode(token).exp < Date.now() / 1000)) {
        next(action);
        localStorage.clear();
    }
    next(action);
};
