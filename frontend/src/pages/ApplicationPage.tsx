import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useApplications, useUpdateApplicationStatus } from '../hooks/useApplication';
import KanbanBoard from '../components/KanbanBoard';
import TimelineDrawer from '../components/TimelineDrawer';
import AddApplicationModal from '../components/addApplicationModel';
import type { ApplicationStatus } from '../types/application';
import Skeleton from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import { useNavigate } from 'react-router-dom';

function ApplicationsPage() {
  const { data: applications, isLoading } = useApplications();
  const updateStatus = useUpdateApplicationStatus();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [locked, setLocked] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
      {/* Fixed header row - never scrolls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexShrink: 0 }}>
        <div>
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
        <button
          onClick={() => setShowAddModal(true)}
          style={{ padding: '10px 16px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          + Add Application
        </button>
      </div>

      {/* Scrollable board region - owns its own horizontal scroll, independent of header */}
      <div style={{ overflowX: 'auto', flex: 1, minWidth: 0 }}>
       {isLoading ? (
              <div style={{ display: 'flex', gap: 12, width: 'max-content' }}>
                {Array.from({ length: 7 }).map((_, colIndex) => (
                  <div
                    key={colIndex}
                    style={{
                      background: 'var(--bg)', borderRadius: 12, padding: 12, minWidth: 220,
                      display: 'flex', flexDirection: 'column', gap: 10,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px' }}>
                      <Skeleton width={8} height={8} borderRadius={4} />
                      <Skeleton width={70} height={12} />
                    </div>
                    {Array.from({ length: colIndex % 2 === 0 ? 2 : 1 }).map((_, cardIndex) => (
                      <div key={cardIndex} style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 10, padding: 12 }}>
                        <Skeleton width="80%" height={14} style={{ marginBottom: 6 }} />
                        <Skeleton width="60%" height={12} style={{ marginBottom: 10 }} />
                        <Skeleton width="40%" height={10} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) :applications && applications.length === 0 ? (
                <EmptyState
                  icon="📋"
                  title="No applications yet"
                  description="Add one manually, or head to Search to find and apply to jobs."
                  actionLabel="Search for jobs"
                  onAction={() => navigate('/search')}
                />
              ) : (
          <KanbanBoard
            applications={applications ?? []}
            onDropApplication={handleDrop}
            onCardClick={setSelectedId}
            locked={locked}
            onLockedDragAttempt={() => toast('Board is locked — unlock it first to change status.')}
          />
        )}
      </div>

      <TimelineDrawer applicationId={selectedId} onClose={() => setSelectedId(null)} />
      {showAddModal && <AddApplicationModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}

export default ApplicationsPage;