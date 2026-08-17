import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as applicationsApi from '../api/applicationsApi';
import type { ApplicationStatus } from '../types/application';

export const useApplications = () =>
  useQuery({ queryKey: ['applications'], queryFn: applicationsApi.getApplications });

export const useTimeline = (id: number | null) =>
  useQuery({
    queryKey: ['applications', id, 'timeline'],
    queryFn: () => applicationsApi.getTimeline(id as number),
    enabled: id !== null,
  });

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: ApplicationStatus }) =>
      applicationsApi.updateApplicationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => applicationsApi.deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};