/* import api from './../../Api';

export const getUserClaims = (userId) => api.get(`/claims/${userId}`);
export const addClaim = (userId, claim) => api.post(`/claims/${userId}`, claim);
export const deleteClaim = (userId, claimType) => api.delete(`/claims/${userId}/${claimType}`);
 */

import api from './../../Api';

export const getUserClaims = (userId) => api.get(`/claims/${userId}`);
export const addClaim = (userId, claim) => api.post(`/claims/${userId}`, claim);
export const deleteClaim = (userId, claimType) => api.delete(`/claims/${userId}`, { data: claimType });
