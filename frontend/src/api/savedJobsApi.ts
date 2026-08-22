import axiosInstance from './axiosInstance';
import type { SavedJob, SaveJobPayload } from '../types/savedJob';
import type { Application } from '../types/application';

export const getSavedJobs = async (): Promise<SavedJob[]> => {
  const res = await axiosInstance.get('/api/saved-jobs');
  return res.data;
};

export const saveJob = async (payload: SaveJobPayload): Promise<SavedJob> => {
  const res = await axiosInstance.post('/api/saved-jobs', payload);
  return res.data;
};

export const deleteSavedJob = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/api/saved-jobs/${id}`);
};

export const applyToSavedJob = async (id: number): Promise<Application> => {
  const res = await axiosInstance.post(`/api/saved-jobs/${id}/apply`);
  return res.data;
};