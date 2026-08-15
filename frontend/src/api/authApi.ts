import axiosInstance from './axiosInstance';
import type { LoginPayload, RegisterPayload, AuthResponse, User } from '../types/auth';

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const res = await axiosInstance.post<AuthResponse>('/api/auth/login', payload);
  return res.data;
};

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const res = await axiosInstance.post<AuthResponse>('/api/auth/register', payload);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post('/api/auth/logout');
};

export const getCurrentUser = async (): Promise<User> => {
  const res = await axiosInstance.get<AuthResponse>('/api/auth/me');
  return { fullName: res.data.fullName, email: res.data.email };
};