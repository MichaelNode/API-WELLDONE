import * as types from './types';
import StorageWrapper from '../../utils/StorageWrapper';

/**
 * Action for user login
 * @param userToken
 * @returns {{type: string, token: *}}
 */
export const loginSuccessAction = (userToken) => {
    StorageWrapper.saveValue('token', userToken);
    return {
        type: types.LOGIN_SUCCESS,
        payload: userToken
    }
};

/**
 * Action for user login error
 * @param error
 * @returns {{type: string, token: *}}
 */
export const loginErrorAction = (error) => {
    StorageWrapper.removeValue('token');
    return {
        type: types.LOGIN_ERROR,
        payload: error
    }
};

/**
 * Action for user logout
 * @returns {{type: string}}
 */
export const logoutAction = (redirect) => {
  StorageWrapper.clear();
  return {
      type: types.LOGOUT,
      payload: redirect
  }
};
