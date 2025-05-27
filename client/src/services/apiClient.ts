import axios, { AxiosError } from 'axios';
import { getClientId } from '@/utils/clientId';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add client ID to all requests
api.interceptors.request.use((config) => {
  config.headers['X-Client-ID'] = getClientId();
  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('(Client) API Response Error:', {
        status: error.response.status,
        message:
          typeof error.response.data === 'object' &&
          error.response.data !== null
            ? (error.response.data as { message?: string }).message
            : 'Unknown error',
      });
    }
    return Promise.reject(error);
  }
);

export default api;
