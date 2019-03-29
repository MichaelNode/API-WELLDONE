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
        dispatch(actions.loginSuccessAction(response))

    }catch (err) {
        console.log(err);
        dispatch(actions.loginErrorAction('Error connecting to the server'));
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
        dispatch(actions.loginErrorAction('Error connecting to the server'));
    }
    dispatch({type: types.LOGOUT});
};

export const deleteUser = () => {
    return async function (dispatch) {
        try {
            await Promise.all([asyncFetch(apiRoutes.delete_user, 'DELETE'), dispatch(logout())]);
            dispatch(actions.hideModal())
        } catch (err) {
            console.log('Hubo un error borrando le usuario', err)
        }
    }
}

export const updateUser = (name, lastname, nickname, address) => {

    const body = {
        userName: name, 
        userLastName: lastname,
        userNickName: nickname, 
        userAddress: address
    };

    return async function (dispatch) {
        try {
            await asyncFetch(apiRoutes.user, 'PUT', JSON.stringify(body));
            
        } catch (err) {
            console.log('Hubo un error actualizando le usuario', err)
        }
    }
}
