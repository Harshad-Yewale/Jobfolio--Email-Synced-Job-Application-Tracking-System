import axiosInstance from './axiosInstance';
import type { JobSearchPayload, JobSearchResponse } from '../types/job';

export const searchJobs = async (payload: JobSearchPayload): Promise<JobSearchResponse> => {
  const res = await axiosInstance.post('/api/jobs/search', payload);
  return res.data;
};