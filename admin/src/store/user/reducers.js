import {LOGIN_ERROR, LOGIN_STARTED, LOGIN_SUCCESS, LOGOUT} from "./types";

const initialState = {
    isLogged: false,
    isLoading: false,
    error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_STARTED:
        return {...state, isLogged: false, isLoading: true, error: ''};
    case LOGIN_SUCCESS:
        return {...state, isLogged: true, isLoading: false, user: action.payload, error: ''};
    case LOGIN_ERROR:
        return {...state, isLogged: false, isLoading: false, user: null, error: action.payload};
    case LOGOUT:
        return {...state, isLogged: false, isLoading: false, user: null, error: ''};
    default:
        return state;
    }
};

export default reducer;
