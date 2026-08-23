export interface EmailConnectionStatusResponse {
  emailAddress: string;
  syncEnabled: boolean;
  lastSyncedAt: string | null;
  daysUntilLikelyExpiry: number;
  needsReconnectSoon: boolean;
}