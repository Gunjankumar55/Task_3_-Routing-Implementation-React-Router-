// src/services/api.js
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

// User endpoints
export const getUsers = () => {
  return axios.get(`${API_URL}/users`);
};

export const getUser = (id) => {
  return axios.get(`${API_URL}/users/${id}`);
};

export const createUser = (userData) => {
  return axios.post(`${API_URL}/users`, userData);
};

export const updateUser = (id, userData) => {
  return axios.put(`${API_URL}/users/${id}`, userData);
};

export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/users/${id}`);
};

// Product endpoints
export const getProducts = () => {
  return axios.get(`${API_URL}/products`);
};

export const getProduct = (id) => {
  return axios.get(`${API_URL}/products/${id}`);
};

export const createProduct = (productData) => {
  return axios.post(`${API_URL}/products`, productData);
};

export const updateProduct = (id, productData) => {
  return axios.put(`${API_URL}/products/${id}`, productData);
};

export const deleteProduct = (id) => {
  return axios.delete(`${API_URL}/products/${id}`);
};
