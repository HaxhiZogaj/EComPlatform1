import api from './../../Api';

export const login = (email, password) => 
  api.post('/Auth/login', { email, password });

export const register = (fullName, email, password) => 
  api.post('/Auth/register', { fullName, email, password });

export const logout = () => 
  api.post('/Auth/logout');