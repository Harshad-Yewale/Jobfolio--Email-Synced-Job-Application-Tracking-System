import axiosInstance from './axiosInstance';
import type {
  DashboardSummaryResponse,
  ConversionFunnelResponse,
  WeeklyApplicationsResponse,
  RecentActivityResponse,
} from '../types/dashboard';

export const getSummary = async (): Promise<DashboardSummaryResponse> => {
  const res = await axiosInstance.get('/api/dashboard/summary');
  return res.data;
};

export const getFunnel = async (): Promise<ConversionFunnelResponse> => {
  const res = await axiosInstance.get('/api/dashboard/funnel');
  return res.data;
};

export const getWeekly = async (): Promise<WeeklyApplicationsResponse[]> => {
  const res = await axiosInstance.get('/api/dashboard/weekly');
  return res.data;
};

export const getRecentActivity = async (limit = 10): Promise<RecentActivityResponse[]> => {
  const res = await axiosInstance.get('/api/dashboard/recent-activity', { params: { limit } });
  return res.data;
};