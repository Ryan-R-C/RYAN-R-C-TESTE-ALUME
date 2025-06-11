import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface ErrorStrategy {
  handle: (error: AxiosError<{ message?: string }>) => void;
}

interface ErrorStrategies {
  [key: number]: ErrorStrategy;
  default: ErrorStrategy;
  network: ErrorStrategy;
}

export const errorStrategies: ErrorStrategies = {
  400: {
    handle: (error) => {
      const message = error.response?.data?.message || 'Requisição inválida.';
      toast.error(message);
      console.warn('Erro de requisição:', message);
    },
  },
  401: {
    handle: (error) => {
      const message = error.response?.data?.message || 'Não autorizado. Faça login novamente.';
      toast.error(message);
      console.warn('Não autorizado. Redirecionando para login...');
      localStorage.removeItem('token');
      if(window.location.pathname != '/login'){
          window.location.pathname = '/login';
      }
    },
  },
  403: {
    handle: (error) => {
      const message = error.response?.data?.message || 'Acesso proibido.';
      toast.error(message);
      console.warn('Acesso proibido:', message);
    },
  },
  500: {
    handle: (error) => {
      const message = error.response?.data?.message || 'Erro interno do servidor.';
      toast.error(message);
      console.error('Erro interno do servidor:', message);
    },
  },
  default: {
    handle: (error) => {
      const message = error.response?.data?.message || 'Erro inesperado.';
      toast.error(message);
      console.error('Erro inesperado:', message);
    },
  },
  network: {
    handle: (error) => {
      const message = 'Erro de conexão com o servidor. Verifique sua internet.';
      toast.error(message);
      console.error('Erro de conexão:', error.message);
    },
  },
};