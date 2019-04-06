
const API_BASE = `${process.env.REACT_APP_API_URL}/apiv1`;

export default {
    login: `${API_BASE}/user/login`,
    logout: `${API_BASE}/user/logout`,
    delete_user: `${API_BASE}/deleteuser`,
    user: `${API_BASE}/user`,
    article: `${API_BASE}/article/addarticle`,
    categories: `${API_BASE}/article/categories`
};
