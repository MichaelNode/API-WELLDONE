import * as actions from './actions';
import * as types from "./types";
import {asyncFetch, isSuccessResponse} from "../../utils/apiService";
import apiRoutes from "../../config/apiRoutes";

/**
 * Operation for user login
 * @param email
 * @param password
 * @returns {Function}
 */
export const auth = (email, password) => async dispatch =>{
    // Login started
    dispatch({type: types.LOGIN_STARTED});

    // send email and password
    const body = {
        email: email,
        password: password,
    };

    try {
        const response = await asyncFetch(apiRoutes.login, 'POST', JSON.stringify(body));
        // if have an error dispatch login error
        if (!isSuccessResponse(response)) {
            return dispatch(actions.loginErrorAction(response.error));
        }
        // dispatch login success with token
        dispatch(actions.loginSuccessAction(response.token))

    }catch (err) {
        console.log(err);
        dispatch(actions.loginErrorAction(err));
    }
};

/**
 * Operation for user logout
 * @returns {Function}
 */
export const logout = (redirect) => async dispatch => {
    try {
        const response = await asyncFetch(apiRoutes.logout, 'GET');
        // if have an error dispatch login error
        if (!isSuccessResponse(response)) {
            return dispatch(actions.loginErrorAction(response.error));
        }
        console.log(redirect);
        // dispatch logout
        dispatch(actions.logoutAction(redirect));

    }catch (err) {
        console.log(err);
        dispatch(actions.loginErrorAction(err));
    }
    dispatch({type: types.LOGOUT});
};
