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

export const showUpdateForm = () =>{
    return {
      type: types.SHOW_UPDATE_FORM
    }
};

export const getFirstName = username => {
  return {
    type: types.GET_FIRST_NAME,
    payload: username
  }
};

export const getLastName = lastname => {
  return {
    type: types.GET_LAST_NAME,
    payload: lastname
  }
};

export const getNickName = nickname => {
  return {
    type: types.GET_NICK_NAME,
    payload: nickname
  }
};

export const getAddress = address => {
  return {
    type: types.GET_ADDRESS,
    payload: address
  }
};
