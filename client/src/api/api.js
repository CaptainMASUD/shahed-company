import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// Intercept API errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    alert(error.response?.data?.message || 'An error occurred');
    return Promise.reject(error);
  }
);

export default API;
