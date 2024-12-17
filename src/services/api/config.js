export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('googleToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};