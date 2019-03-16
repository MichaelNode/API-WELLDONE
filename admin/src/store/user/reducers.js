import * as types from "./types";
import StorageWrapper from '../../utils/StorageWrapper';

const token = StorageWrapper.getValue('token');

const initialState = {
    isLoading: false,
    error: '',
    token: token,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_STARTED:
        return {...state, isLoading: true, token: false, error: ''};
    case types.LOGIN_SUCCESS:
        return {...state, isLoading: false, token: action.payload, error: ''};
    case types.LOGIN_ERROR:
        return {...state, isLoading: false, token: null, error: action.payload};
    case types.LOGOUT:
        return {...state, isLoading: false, token: null, error: ''};
    default:
        return state;
    }
};

export default reducer;
