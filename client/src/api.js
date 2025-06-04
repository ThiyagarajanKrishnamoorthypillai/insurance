// src/api.js
import axios from 'axios';

// Base URL from .env
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // if using cookies/JWT in auth
});

// Attach token if using JWT in headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // or use cookies
  if (token) {
    req.headers['x-auth-token'] = token;
  }
  return req;
});

export default API;
