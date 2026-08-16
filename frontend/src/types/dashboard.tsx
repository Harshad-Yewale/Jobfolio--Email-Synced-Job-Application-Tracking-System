export interface DashboardSummaryResponse {
  totalApplications: number;
  activeApplications: number;
  interviews: number;
  offersReceived: number;
  offersAccepted: number;
  successRate: number;
}

export interface ConversionFunnelResponse {
  applied: number;
  received: number;
  assessment: number;
  interview: number;
  offer: number;
  accepted: number;
}

export interface WeeklyApplicationsResponse {
  weekLabel: string;
  count: number;
}

export interface RecentActivityResponse {
  applicationId: number;
  company: string;
  jobTitle: string;
  oldStatus: string | null;
  newStatus: string;
  source: 'MANUAL' | 'EMAIL_SYNC';
  createdAt: string;
}