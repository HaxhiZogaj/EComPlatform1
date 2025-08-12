import api from '../../Api';

export const getRoles = () => api.get('/roles');
export const createRole = (roleName) => api.post('/roles', { name: roleName });

export const deleteRole = (roleName) => api.delete(`/roles/${roleName}`);
