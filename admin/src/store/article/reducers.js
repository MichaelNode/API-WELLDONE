import * as types from "./types";
import StorageWrapper from '../../utils/StorageWrapper';

const token = StorageWrapper.getValue('token');

const initialState = {
    error: '',
    token: token,
    showform: false,
    updateAccount : false
  
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_FORM:
        return {...state, showform: true,  updateAccount: false}
    default:
        return state;
    }
};

export default reducer
