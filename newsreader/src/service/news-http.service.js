import http from "../http-common";

export const getAllCategories = () => {
    return http.get("api/news/countries");
};