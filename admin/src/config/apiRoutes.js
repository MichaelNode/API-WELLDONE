
const API_BASE = `${process.env.REACT_APP_API_URL}/apiv1`;
const APP_BASE = `${process.env.REACT_APP_API_URL}`;

export default {
    login: `${API_BASE}/user/login`,
    logout: `${API_BASE}/user/logout`,
    delete_user: `${API_BASE}/deleteuser`,
    user: `${API_BASE}/user`,
    users: `${API_BASE}/users`,
    article: `${API_BASE}/article/addarticle`,
    categories: `${API_BASE}/article/categories`,
    favourites: `${API_BASE}/article/favourites`,
    articles: `${APP_BASE}/article`,
    article_edit: `${API_BASE}/article/editarticle/`,
    article_me: `${API_BASE}/article/me`,
    article_delete: `${API_BASE}/article/deleteArticle/`,
    underlined: `${API_BASE}/underlinetext`,
    summary: `${API_BASE}/article/resumen`
};
