export interface SavedJob {
  id: number;
  jobTitle: string;
  company: string;
  jobUrl: string | null;
  location: string | null;
  source: string | null;
  savedAt: string;
}

export interface SaveJobPayload {
  jobTitle: string;
  company: string;
  jobUrl?: string;
  location?: string;
  source?: string;
}