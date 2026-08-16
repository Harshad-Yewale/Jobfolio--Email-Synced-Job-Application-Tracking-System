import { useQuery } from '@tanstack/react-query';
import * as dashboardApi from '../api/dashboardApi';

export const useSummary = () =>
  useQuery({ queryKey: ['dashboard', 'summary'], queryFn: dashboardApi.getSummary });

export const useFunnel = () =>
  useQuery({ queryKey: ['dashboard', 'funnel'], queryFn: dashboardApi.getFunnel });

export const useWeekly = () =>
  useQuery({ queryKey: ['dashboard', 'weekly'], queryFn: dashboardApi.getWeekly });

export const useRecentActivity = (limit = 10) =>
  useQuery({ queryKey: ['dashboard', 'recent-activity', limit], queryFn: () => dashboardApi.getRecentActivity(limit) });