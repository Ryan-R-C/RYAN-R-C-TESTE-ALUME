import type { LoginData, MeResponse, ProfileData, RegisterData } from '../types/authTypes';
import api from './api';

export const loginRequest = (data: LoginData) => {
  return api.post('/login', data);
};

export const registerRequest = (data: RegisterData) => {
  return api.post('/register', data);
};

export const getProfileRequest = (): Promise<MeResponse> => {
  return api.get('/me');
};

export const updateProfileRequest = (data: ProfileData) => {
  return api.put('/me', data);
};
