import http from "../http-common";

export const getAllCategories = () => {
    return http.get("/api/news/categories");
};

export const getHeadlinesByCategory = (categoryIds) => {
    return http.get(`/api/news/headlines?categories=${categoryIds}`);
}

export const getArticleById = (articleId) => {
    return http.get(`/api/news/article/${articleId}`);
}

export const getHeadlineByArticleId = (articleId) => {
    return http.get(`/api/news/headlines?article=${articleId}`);
}

export const getCommentsByArticleId = (articleId) => {
    return http.get(`/api/news/comments?article=${articleId}`);
}

export const postLikeOnArticle = (articleId) => {
    return http.post(`/api/news/article/${articleId}/like`);
}