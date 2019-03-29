import * as types from './types';
import StorageWrapper from '../../utils/StorageWrapper';

/**
 * Action for user login
 * @param userToken
 * @returns {{type: string, token: *}}
 */
export const loginSuccessAction = (loginData) => {
    StorageWrapper.saveValue('token', loginData.token);
    return {
        type: types.LOGIN_SUCCESS,
        payload: loginData
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

export const showModal = () =>{
  return {
    type: types.SHOW_MODAL
  }
};

export const hideModal = () =>{
    return {
      type: types.HIDE_MODAL
    }
  };

