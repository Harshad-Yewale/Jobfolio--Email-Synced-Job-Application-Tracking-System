import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as savedJobsApi from '../api/savedJobsApi';

export const useSavedJobs = () =>
  useQuery({ queryKey: ['savedJobs'], queryFn: savedJobsApi.getSavedJobs });

export const useSaveJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: savedJobsApi.saveJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedJobs'] });
    },
  });
};

export const useDeleteSavedJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: savedJobsApi.deleteSavedJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedJobs'] });
    },
  });
};

export const useApplyToSavedJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: savedJobsApi.applyToSavedJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedJobs'] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};