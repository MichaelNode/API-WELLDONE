// Dependencies
import apiRoutes from '../../config/apiRoutes';
import {asyncFetch, isSuccessResponse} from "../../utils/apiService";

/**
 * Function for get articles of user
 * @param token
 * @returns {Promise<*>}
 */
export const getMyArticles = async(token) => {
  const headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json',
    'token': token
  };

  const response = await asyncFetch(apiRoutes.article_me, 'GET', null, headers);
  if(!isSuccessResponse(response)){
    throw response.error || 'Error getting articles';
  }
  return response;
};