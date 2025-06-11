import { createContext, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';
import api from '../services/api';
import { loginRequest, getProfileRequest, updateProfileRequest } from '../services/authService';
import type { ProfileData } from '../types/authTypes';

interface AuthContextData {
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<ProfileData>;
  updateProfile: (data: ProfileData) => Promise<void>; 
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, _setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const setToken = (value: string | null) => {
    _setToken(value)
    localStorage.setItem('token', value!)
  }

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const login = async (email: string, senha: string) => {
    const response = await loginRequest({ email, senha });
    const newToken = response.data.token;
    setToken(newToken);
    return newToken;
  };

  const getProfile = async () => {
    const { data } = await getProfileRequest()
    return data
  };

  const updateProfile = async (data: ProfileData) => {
    await updateProfileRequest(data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  
  return (
    <AuthContext.Provider value={{ token, login, logout, getProfile, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};