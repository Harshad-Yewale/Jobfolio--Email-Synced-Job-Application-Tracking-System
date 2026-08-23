import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as emailApi from '../api/emailApi';

export const useEmailStatus = () =>
  useQuery({
    queryKey: ['emailStatus'],
    queryFn: emailApi.getEmailStatus,
    retry: false, // a 404 here means "not connected", not a transient error - don't retry it
  });

export const usePauseSync = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: emailApi.pauseSync,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['emailStatus'] }),
  });
};

export const useResumeSync = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: emailApi.resumeSync,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['emailStatus'] }),
  });
};

export const useDisconnectEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: emailApi.disconnectEmail,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['emailStatus'] }),
  });
};

export const useSyncNow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: emailApi.syncNow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailStatus'] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};