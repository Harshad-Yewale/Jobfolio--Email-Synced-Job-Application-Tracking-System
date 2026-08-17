export type ApplicationStatus =
  | 'APPLIED' | 'RECEIVED' | 'ASSESSMENT' | 'INTERVIEW'
  | 'OFFER' | 'ACCEPTED' | 'REJECTED';

export interface Application {
  id: number;
  jobTitle: string;
  company: string;
  jobUrl: string | null;
  location: string | null;
  source: string | null;
  status: ApplicationStatus;
  lastStatusSource: string | null; // 'MANUAL' | 'EMAIL_SYNC' | null
  appliedDate: string;
  updatedAt: string;
}

export interface ApplicationEvent {
  oldStatus: ApplicationStatus | null;
  newStatus: ApplicationStatus;
  source: 'MANUAL' | 'EMAIL_SYNC';
  createdAt: string;
}

export interface CreateApplicationPayload {
  jobTitle: string;
  company: string;
  jobUrl?: string;
  location?: string;
  source?: string;
}