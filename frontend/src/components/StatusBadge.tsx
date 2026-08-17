import type { ApplicationStatus } from '../types/application';

export const statusConfig: Record<ApplicationStatus, { label: string; color: string }> = {
  APPLIED: { label: 'Applied', color: 'var(--st-applied)' },
  RECEIVED: { label: 'Received', color: 'var(--st-received)' },
  ASSESSMENT: { label: 'Assessment', color: 'var(--st-assessment)' },
  INTERVIEW: { label: 'Interview', color: 'var(--st-interview)' },
  OFFER: { label: 'Offer', color: 'var(--st-offer)' },
  ACCEPTED: { label: 'Accepted', color: 'var(--st-accepted)' },
  REJECTED: { label: 'Rejected', color: 'var(--st-rejected)' },
};

function StatusBadge({ status }: { status: ApplicationStatus }) {
  const config = statusConfig[status];
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#fff',
        background: config.color,
        padding: '3px 8px',
        borderRadius: 20,
      }}
    >
      {config.label}
    </span>
  );
}

export default StatusBadge;