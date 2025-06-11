import { createContext, useState, useEffect, type ReactNode } from 'react';
import { loginRequest, getProfileRequest, updateProfileRequest } from '../services/authService';
import type { ProfileData } from '../types/authTypes';
import { inserToken } from '../utils/inserToken';

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
      inserToken(token);
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
    setToken(null);
    localStorage.removeItem('token');
  };
  
  return (
    <AuthContext.Provider value={{ token, login, logout, getProfile, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};