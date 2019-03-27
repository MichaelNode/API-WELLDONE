import * as types from "./types";
import StorageWrapper from '../../utils/StorageWrapper';

const token = StorageWrapper.getValue('token');

const initialState = {
    isLoading: false,
    error: '',
    token: token,
    redirect: false,
    showModal: false,
    updateAccount: false,
    userName: '',
    lastName: '',
    nickName: '',
    address: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_STARTED:
        return {...state, isLoading: true, token: false, error: '', redirect: false, updateAccount: false};
    case types.LOGIN_SUCCESS:
        return {...state, isLoading: false, token: action.payload, error: '', redirect: false, updateAccount: false};
    case types.LOGIN_ERROR:
        return {...state, isLoading: false, token: null, error: action.payload, redirect: false, updateAccount: false};
    case types.LOGOUT:
        return {...state, isLoading: false, token: null, error: '', redirect: action.payload, updateAccount: false};
    case types.SHOW_MODAL:
        return {...state, showModal: true, updateAccount: false}
    case types.HIDE_MODAL:
        return {...state, showModal: false}
    case types.SHOW_UPDATE_FORM:
        return {...state, updateAccount: true}
    case types.GET_FIRST_NAME:
        return {...state, userName: action.payload}
    case types.GET_LAST_NAME:
        return {...state, lastName: action.payload}
    case types.GET_NICK_NAME:
        return {...state, nickName: action.payload}
    case types.GET_ADDRESS:
        return {...state, address: action.payload}
    default:
        return state;
    }
};

export default reducer
