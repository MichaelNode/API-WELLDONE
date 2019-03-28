import * as actions from './actions';
import * as types from "./types";
import {asyncFetch, isSuccessResponse} from "../../utils/apiService";
import apiRoutes from "../../config/apiRoutes";


export const addArticle = (name, lastname, nickname, address) => {

    const body = {
        userName: name, 
        userLastName: lastname,
        userNickName: nickname, 
        userAddress: address
    };

    return async function (dispatch) {
        try {
            await asyncFetch(apiRoutes.user, 'POST', JSON.stringify(body));
            
        } catch (err) {
            console.log('Hubo un error actualizando le usuario', err)
        }
    }
}
