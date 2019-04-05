import * as actions from './actions';
import * as types from "./types";
import {asyncFetch, isSuccessResponse} from "../../utils/apiService";
import apiRoutes from "../../config/apiRoutes";


export const addArticle = (title,file,summary,content,state,category,publi_date, url, token, nickname) => {

    const formData = new FormData();
  
    formData.append('title',   title);
    formData.append('file',     file);
    formData.append('summary',  summary);
    formData.append('content',  content);
    formData.append('state',    state);
    formData.append('category', category);
    // eslint-disable-next-line no-unused-expressions
    formData.append('publi_date', publi_date),
    formData.append('url', url),
    formData.append('token', token),
    formData.append('nickname', nickname)

    console.log(token,nickname)

    const headers = {
        'Accept': 'application/json application/x-www-form-urlencoded',
    }

    return async function (dispatch) {
        try {
            await asyncFetch(apiRoutes.article, 'POST', formData , headers);
            
        } catch (err) {
            console.log('Hubo un error actualizando le usuario', err)
        }
    }
}
