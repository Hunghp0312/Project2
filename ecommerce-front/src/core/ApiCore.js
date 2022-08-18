import { API } from "../config";
import queryString from "query-string";
export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
export const listComment = (productId, skip, limit) => {
    const data = { limit, skip };
    return fetch(`${API}/comment/list/${productId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const postComment = (userId, token, productId, content) => {
    return fetch(`${API}/comment/create/${userId}/${productId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: { content: content } }),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
export const deleteComment = (userId, token, commentId) => {
    return fetch(`${API}/comment/delete/${userId}/${commentId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
export const list = (params) => {
    const query = queryString.stringify(params);
    console.log(query);
    return fetch(`${API}/products/search?${query}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
export const getSingleProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
export const listRelated = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ order: createOrderData }),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
export const getFilteredProduct = (skip, limit, filters = {}) => {
    // console.log(name, email, password);
    const data = { limit, skip, filters };
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
