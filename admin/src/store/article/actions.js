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
