import api from './../../Api';

export const getAllCategories = () => api.get('/Category');

export const getCategoryById = (id) => api.get(`/Category/${id}`);

export const addCategory = (categoryData) => api.post('/Category', categoryData);

export const updateCategory = (id, categoryData) => api.put(`/Category/${id}`, categoryData);

export const deleteCategory = (id) => api.delete(`/Category/${id}`);
