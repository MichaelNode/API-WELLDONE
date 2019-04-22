import * as types from "./types";
import StorageWrapper from '../../utils/StorageWrapper';


const token = StorageWrapper.getValue('token');

const initialState = {
    error: '',
    token: token,
    showform: false,
    updateAccount : false,
    message: '',
    show_modal: false,
    getArticles: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_FORM:
        return {...state, showform: true,  updateAccount: false}
    case types.SUCCESS_MESSAGE:
        return {...state, message: action.payload}
    case types.SUCCESS_MESSAGE_EDIT:
        return {...state, message: action.payload}
    case types.HIDE_ARTCILE_MODAL:
        return {...state, show_modal: false }
    case types.GET_ARTICLES:
        return {...state, getArticles: true }
    case types.ARTICLES_LOADED:
        return {...state, getArticles: false }
    default:
        return state;
    }
    
};

export default reducer
