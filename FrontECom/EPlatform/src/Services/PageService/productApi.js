import api from './../../Api';

export const getAllProducts = () => api.get('/product');

export const getProductById = (id) => api.get(`/product/${id}`);

export const addProduct = (productData) => api.post('/product', productData);

export const updateProduct = (id, productData) => api.put(`/product/${id}`, productData);

export const deleteProduct = (id) => api.delete(`/product/${id}`);
