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
    userData: userData
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
        return {...state, isLoading: false, token: null, error: '', redirect: action.payload};
    case types.SHOW_MODAL:
        return {...state, showModal: true, }
    case types.HIDE_MODAL:
        return {...state, showModal: false}
    default:
        return state;
    }
};

export default reducer
