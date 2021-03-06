import * as types from './types';
import StorageWrapper from '../../utils/StorageWrapper';

/**
 * Action for user login
 * @param userToken
 * @returns {{type: string, token: *}}
 */
export const showForm = (userToken) =>{
    StorageWrapper.saveValue('token', userToken);
    return {
      type: types.SHOW_FORM
    }
};

export const successMessage = (message) => {
  return {
      type: types.SUCCESS_MESSAGE,
      payload: message
  }
};

export const successMessageEdit = (message) => {
  return {
      type: types.SUCCESS_MESSAGE_EDIT,
      payload: message
  }
};

export const hideModal = () =>{
    return {
      type: types.HIDE_ARTCILE_MODAL
    }
  };

  export const getArticles = () =>{
    return {
      type: types.GET_ARTICLES
    }
  };

  export const articlesLoaded = () =>{
    return {
      type: types.ARTICLES_LOADED
    }
  };