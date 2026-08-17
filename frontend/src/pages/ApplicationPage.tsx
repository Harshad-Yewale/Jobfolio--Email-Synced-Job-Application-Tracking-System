import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useApplications, useUpdateApplicationStatus } from '../hooks/useApplication';
import KanbanBoard from '../components/KanbanBoard';
import TimelineDrawer from '../components/TimelineDrawer';
import type { ApplicationStatus } from '../types/application';

function ApplicationsPage() {
  const { data: applications, isLoading } = useApplications();
  const updateStatus = useUpdateApplicationStatus();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    toast('Board is locked — click 🔒 Locked to enable dragging.');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDrop = (applicationId: number, newStatus: ApplicationStatus) => {
    updateStatus.mutate(
      { id: applicationId, status: newStatus },
      {
        onSuccess: () => toast.success('Status updated'),
        onError: () => toast.error('Could not update status. Refresh and try again.'),
      },
    );
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ fontSize: 22 }}>Applications</h1>
          <button
            onClick={() => setLocked((prev) => !prev)}
            style={{
              padding: '5px 12px',
              background: locked ? 'var(--panel)' : 'var(--accent-soft)',
              color: locked ? 'var(--ink-soft)' : 'var(--accent)',
              border: '1px solid var(--line)',
              borderRadius: 20,
              fontSize: 13,
              whiteSpace: 'nowrap',
            }}
          >
            {locked ? '🔒 Locked' : '🔓 Unlocked'}
          </button>
        </div>
        <p style={{ color: 'var(--ink-soft)', margin: '4px 0 0' }}>
          {locked
            ? 'Unlock to drag cards between columns.'
            : 'Drag cards between columns to update status. Accepted and Rejected are final.'}
        </p>
      </div>

      {isLoading ? (
        <p>Loading applications...</p>
      ) : (
        <KanbanBoard
          applications={applications ?? []}
          onDropApplication={handleDrop}
          onCardClick={setSelectedId}
          locked={locked}
          onLockedDragAttempt={() => toast('Board is locked — unlock it first to change status.')}
        />
      )}

      <TimelineDrawer applicationId={selectedId} onClose={() => setSelectedId(null)} />
    </div>
  );
}

export default ApplicationsPage;