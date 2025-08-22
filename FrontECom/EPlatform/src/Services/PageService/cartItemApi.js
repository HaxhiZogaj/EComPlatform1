import api from './../../Api';

export const getAllCartItems = () => api.get('/CartItem');
export const getCartItemById = (id) => api.get(`/CartItem/${id}`);
export const addCartItem = (data) => api.post('/CartItem', data);
export const updateCartItem = (id, data) => api.put(`/CartItem/${id}`, data);
export const deleteCartItem = (id) => api.delete(`/CartItem/${id}`);
