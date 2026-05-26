import axios, { AxiosInstance } from 'axios';

const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://zym-backend-2h03.onrender.com';
// Ensure we point to the backend API mount (/api)
// If RAW_API_URL already points to the API mount (e.g. '/api' or ends with '/api'), use it directly
const API_URL = RAW_API_URL.replace(/\/$/, '').endsWith('/api')
  ? RAW_API_URL.replace(/\/$/, '')
  : RAW_API_URL.replace(/\/$/, '') + '/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  // Attach token from localStorage when available (will run only in browser)
  try {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers = config.headers || {};
        // Only set header if not explicitly skipped
        if (!config.headers['x-skip-auth']) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
    }
  } catch (e) {
    // ignore
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
        (error) => {
          const skipRedirect = error.response?.config?.headers?.['x-skip-redirect'];
          if (typeof window !== 'undefined' && error.response?.status === 401 && !skipRedirect) {
            const isAuthPage = ['/login', '/register', '/'].includes(window.location.pathname);
            if (!isAuthPage) {
              localStorage.removeItem('user');
              window.location.href = '/login';
            }
          }
          return Promise.reject(error);
        }
);

export default api;
