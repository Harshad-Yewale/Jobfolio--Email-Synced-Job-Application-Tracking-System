export interface Job {
  title: string;
  company: string;
  location: string | null;
  job_url: string | null;
  site: string | null;
  date_posted: string | null;
  description: string | null;
  alreadyApplied: boolean;
}

export interface JobSearchPayload {
  search_term: string;
  location?: string;
  results_wanted?: number;
  site_names?: string[];
  hours_old?: number;
}

export interface JobSearchResponse {
  count: number;
  jobs: Job[];
}