import http from "../http-common";

export const userLogin = (data) => {
    return http.get("/users?email=" + data.email + "&password=" + data.password);
};

export const setLoggedUser = (user) => {
    return http.post('/loggeduser',user);
}

export const getLoggedUser = () => {
    return http.get('/loggeduser');
}

export const getAllCategories = () => {
    return http.get("/api/news/categories");
};

export const getHeadlinesByCategory = (categoryIds) => {
    return http.get(`/api/news/headlines?categorieId=${categoryIds}`);
}

export const getArticleById = (articleId) => {
    return http.get(`/api/news/articles/${articleId}?_embed=likes&_embed=comments`);
}

export const getHeadlineByArticleId = (articleId) => {
    return http.get(`/api/news/headlines?articleId=${articleId}`);
}

export const getCommentsByArticleId = (articleId) => {
    return http.get(`/api/news/comments?articleId=${articleId}`);
}

export const getLikeOnArticle = (userId) => {
    return http.post(`/api/news/likes?userId=${userId}`);
}