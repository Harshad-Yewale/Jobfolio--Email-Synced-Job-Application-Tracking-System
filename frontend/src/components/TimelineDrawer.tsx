import { useTimeline } from '../hooks/useApplication'
import StatusBadge from './StatusBadge';

interface TimelineDrawerProps {
  applicationId: number | null;
  onClose: () => void;
}

function TimelineDrawer({ applicationId, onClose }: TimelineDrawerProps) {
  const { data: events, isLoading } = useTimeline(applicationId);

  if (applicationId === null) return null;

  return (
    <div
      style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 360,
        background: 'var(--panel)', borderLeft: '1px solid var(--line)',
        padding: 24, overflowY: 'auto', boxShadow: '-4px 0 16px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ fontSize: 16 }}>Status timeline</h3>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: 18 }}>×</button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : events && events.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {events.map((event, i) => (
            <div key={i} style={{ borderLeft: '2px solid var(--line)', paddingLeft: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <StatusBadge status={event.newStatus} />
                {event.source === 'EMAIL_SYNC' && (
                  <span style={{ fontSize: 9, background: 'var(--accent-soft)', color: 'var(--accent)', padding: '2px 6px', borderRadius: 20, fontWeight: 700 }}>
                    AUTO-DETECTED
                  </span>
                )}
              </div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
                {new Date(event.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--ink-soft)' }}>No status changes yet.</p>
      )}
    </div>
  );
}

export default TimelineDrawer;