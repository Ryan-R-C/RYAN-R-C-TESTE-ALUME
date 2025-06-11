import axios, { AxiosError, type AxiosInstance } from 'axios';
import { errorStrategies } from './errorStrategies';

const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;
const TIMEOUT: number = 30 * 1000;

export const authHeader = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const api: AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: TIMEOUT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...authHeader(),
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response) {
      const { status } = error.response;
      const strategy = errorStrategies[status] || errorStrategies.default;
      strategy.handle(error);
    } else {
      errorStrategies.network.handle(error);
    }

    return Promise.reject(error);
  }
);

export default api;