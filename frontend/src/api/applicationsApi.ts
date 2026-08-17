import axiosInstance from './axiosInstance';
import type { Application, ApplicationEvent, ApplicationStatus, CreateApplicationPayload } from '../types/application';

export const getApplications = async (): Promise<Application[]> => {
  const res = await axiosInstance.get('/api/applications');
  return res.data;
};

export const createApplication = async (payload: CreateApplicationPayload): Promise<Application> => {
  const res = await axiosInstance.post('/api/applications', payload);
  return res.data;
};

export const deleteApplication = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/api/applications/${id}`);
};

export const updateApplicationStatus = async (id: number, status: ApplicationStatus): Promise<Application> => {
  const res = await axiosInstance.patch(`/api/applications/${id}/status`, { status });
  return res.data;
};

export const getTimeline = async (id: number): Promise<ApplicationEvent[]> => {
  const res = await axiosInstance.get(`/api/applications/${id}/timeline`);
  return res.data;
};