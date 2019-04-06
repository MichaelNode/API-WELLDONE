import * as types from "./types";
import StorageWrapper from '../../utils/StorageWrapper';

const token = StorageWrapper.getValue('token');
const userData = JSON.parse(StorageWrapper.getValue('userData'));

const initialState = {
    isLoading: false,
    error: '',
    token: token,
    redirect: false,
    showModal: false,
    userData: userData,
    message: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_STARTED:
        return {...state, isLoading: true, token: false, error: '', redirect: false};
    case types.LOGIN_SUCCESS:
        return {...state, isLoading: false, token: action.payload.token, userData: action.payload.user, error: '', redirect: false};
    case types.LOGIN_ERROR:
        return {...state, isLoading: false, token: null, error: action.payload, redirect: false};
    case types.LOGOUT:
        return {...state, isLoading: false, token: null, error: '', redirect: action.payload, message: ''};
    case types.SHOW_MODAL:
        return {...state, showModal: true, }
    case types.HIDE_MODAL:
        return {...state, showModal: false}
    case types.SUCCESS_MESSAGE:
        return {...state, message: action.payload}
    case types.USER_DATA_UPDATE:
        return {...state, userData: action.payload}
    default:
        return state;
    }
};

export default reducer