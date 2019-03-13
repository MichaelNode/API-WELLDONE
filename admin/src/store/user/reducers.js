import {LOGIN_ERROR, LOGIN_STARTED, LOGIN_SUCCESS, LOGOUT} from "./types";

const initialState = {
    isLogged: false,
    isAuthenticating: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_STARTED:
        return {...state, isLogged: false, isAuthenticating: true};
    case LOGIN_SUCCESS:
      return {...state, isLogged: true, isAuthenticating: false, user: action.payload};
    case LOGIN_ERROR:
    case LOGOUT:
      return {...state, isLogged: false, isAuthenticating: false, user: null};
    default:
      return state;
    }
};

export default reducer;
