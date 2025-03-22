import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

// User API calls
export const getUsers = () => axios.get(`${BASE_URL}/users`);
export const getUser = (id) => axios.get(`${BASE_URL}/users/${id}`);
export const createUser = (userData) => axios.post(`${BASE_URL}/users`, userData);
export const updateUser = (id, userData) => axios.put(`${BASE_URL}/users/${id}`, userData);
export const deleteUser = (id) => axios.delete(`${BASE_URL}/users/${id}`);

// Product API calls
export const getProducts = () => axios.get(`${BASE_URL}/products`);
export const getProduct = (id) => axios.get(`${BASE_URL}/products/${id}`);
export const createProduct = (productData) => axios.post(`${BASE_URL}/products`, productData);
export const updateProduct = (id, productData) => axios.put(`${BASE_URL}/products/${id}`, productData);
export const deleteProduct = (id) => axios.delete(`${BASE_URL}/products/${id}`);
