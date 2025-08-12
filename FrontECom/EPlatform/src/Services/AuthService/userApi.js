import api from '../../Api';

export const getUsers = () => api.get('/users');
export const getUserRoles = (email) => api.get(`/users/roles?email=${encodeURIComponent(email)}`);
export const assignRole = (email, role) => api.post(`/users/roles?email=${encodeURIComponent(email)}`, { role });
export const removeRole = (email, role) => api.delete(`/users/roles/${encodeURIComponent(role)}?email=${encodeURIComponent(email)}`);
