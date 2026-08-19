import { useMutation } from '@tanstack/react-query';
import * as jobsApi from '../api/jobsApi';

export const useJobSearch = () =>
  useMutation({
    mutationFn: jobsApi.searchJobs,
  });