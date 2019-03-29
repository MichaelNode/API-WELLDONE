import * as actions from './actions';
import * as types from "./types";
import {asyncFetch, isSuccessResponse} from "../../utils/apiService";
import apiRoutes from "../../config/apiRoutes";


export const addArticle = (title,file,summary,content,state,category) => {

    const body = {
        title,
        file,
        summary,
        content,
        state,
        category
      
    };

    return async function (dispatch) {
        try {
            await asyncFetch(apiRoutes.article, 'POST', JSON.stringify(body));
            
        } catch (err) {
            console.log('Hubo un error actualizando le usuario', err)
        }
    }
}
