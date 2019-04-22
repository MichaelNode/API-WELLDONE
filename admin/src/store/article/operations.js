import * as actions from './actions';
import * as types from "./types";
import {asyncFetch, isSuccessResponse} from "../../utils/apiService";
import apiRoutes from "../../config/apiRoutes";
import { ModalTitle } from 'react-bootstrap';


export const addArticle = (title,file,summary,content,state,category,publi_date, url, token, idUSer, id) => {

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
    formData.append('idUSer', idUSer)
    formData.append('id', id)
    

    const headers = {
        'Accept': 'application/json',
    }

    return async function (dispatch) {
        try {
            await asyncFetch(apiRoutes.article, 'POST', formData , headers);
            if(isSuccessResponse){
                dispatch(actions.successMessage('Article_Add'))
            } 
        } catch (err) {
            console.log('Hubo un error actualizando el artículo', err)
        }
    }
}


export const EditArticle = (title,file,summary,content,state,category,publi_date, url, token, idUSer, id) => {

    const fd = new FormData();

    const body = {
        title: title,
        file:    file,
        summary:  summary,
        content:  content,
        state:    state,
        category: category,
        publi_date: publi_date,
        url: url,
        token:token,
        idUSer: idUSer,
        id: id
    };
  
    fd.append('title',   title)
    fd.append('file',     file)
    fd.append('summary',  summary)
    fd.append('content',  content)
    fd.append('state',    state)
    fd.append('category', category)
    fd.append('publi_date', publi_date)
    fd.append('url', url)
    fd.append('token', token)
    fd.append('idUSer', idUSer)
    fd.append('id', id)

    const headers = {
        'Accept': 'application/json',
    }

    return async function (dispatch) {
        
        try {
            const url_api = apiRoutes.article_edit + id
            await asyncFetch(url_api , 'PUT',  fd, headers);
            if(isSuccessResponse){
                dispatch(actions.successMessageEdit('Article_Updated'))
            } 
            
        } catch (err) {
            console.log('Hubo un error actualizando el artículo', err)
        }                      
    }
}

export const deleteArticle = (id, token) => {
    return async function (dispatch){
        try {
            const body = {
                token: token,
                id: id
            }
            await asyncFetch(apiRoutes.article_delete, 'DELETE', JSON.stringify(body), dispatch(actions.getArticles()))
    
        } catch (error) {
            console.log('hubo un error al borrar el artículo', error)
        }
    }
}
