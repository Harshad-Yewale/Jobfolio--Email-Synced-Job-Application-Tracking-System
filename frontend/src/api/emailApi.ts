import axiosInstance from './axiosInstance';
import type { EmailConnectionStatusResponse } from '../types/email';

export const getEmailStatus = async (): Promise<EmailConnectionStatusResponse> => {
  const res = await axiosInstance.get('/api/email/status');
  return res.data;
};

export const getSessionToken = async (): Promise<string> => {
  const res = await axiosInstance.get('/api/email/token');
  return res.data.token;
};

export const pauseSync = async (): Promise<void> => {
  await axiosInstance.post('/api/email/pause');
};

export const resumeSync = async (): Promise<void> => {
  await axiosInstance.post('/api/email/resume');
};

export const disconnectEmail = async (): Promise<void> => {
  await axiosInstance.delete('/api/email/disconnect');
};

export const syncNow = async (): Promise<string> => {
  const res = await axiosInstance.post('/api/email/sync-now');
  return res.data;
};

// Full browser navigation, NOT axios - this needs to redirect to Google, not return JSON.
export const connectGmail = async (): Promise<void> => {
  const token = await getSessionToken();
  window.location.href = `http://localhost:8080/api/email/oauth2/authorize?token=${encodeURIComponent(token)}`;
};