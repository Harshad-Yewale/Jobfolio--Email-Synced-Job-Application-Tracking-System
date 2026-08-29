import toast from 'react-hot-toast';
import { useSavedJobs, useDeleteSavedJob, useApplyToSavedJob } from '../hooks/useSavedJobs';
import Skeleton from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import { useNavigate } from 'react-router-dom';

function SavedJobsPage() {
  const { data: savedJobs, isLoading } = useSavedJobs();
  const deleteSavedJob = useDeleteSavedJob();
  const applyToSavedJob = useApplyToSavedJob();
  const navigate = useNavigate();

  const handleRemove = (id: number) => {
    deleteSavedJob.mutate(id, {
      onSuccess: () => toast.success('Removed'),
      onError: () => toast.error('Could not remove.'),
    });
  };

  const handleApply = (id: number) => {
    applyToSavedJob.mutate(id, {
      onSuccess: () => toast.success('Moved to Applications'),
      onError: () => toast.error('Could not apply. It may already be an active application.'),
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22 }}>Saved Jobs</h1>
        <p style={{ color: 'var(--ink-soft)', margin: '4px 0 0' }}>
          Jobs you've bookmarked for later.
        </p>
      </div>
          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 12,
                    padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <Skeleton width="55%" height={15} style={{ marginBottom: 6 }} />
                    <Skeleton width="40%" height={13} style={{ marginBottom: 8 }} />
                    <Skeleton width="30%" height={11} />
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Skeleton width={70} height={32} borderRadius={8} />
                    <Skeleton width={100} height={32} borderRadius={8} />
                    <Skeleton width={80} height={32} borderRadius={8} />
                  </div>
                </div>
              ))}
            </div>
          ) : savedJobs && savedJobs.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {savedJobs.map((job) => (
            <div
              key={job.id}
              style={{
                background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 12,
                padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap',
              }}
            >
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{job.jobTitle}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
                  {job.company}{job.location ? ` · ${job.location}` : ''}
                </div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 4 }}>
                  Saved {new Date(job.savedAt).toLocaleDateString()}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                {job.jobUrl && (
                  <a
                    href={job.jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: '8px 14px', borderRadius: 8, fontSize: 13, border: '1px solid var(--line)', color: 'var(--ink)', textDecoration: 'none' }}
                  >
                    View ↗
                  </a>
                )}
                <button
                  onClick={() => handleApply(job.id)}
                  disabled={applyToSavedJob.isPending}
                  style={{ padding: '8px 14px', borderRadius: 8, fontSize: 13, border: 'none', background: 'var(--accent)', color: '#fff' }}
                >
                  Mark Applied
                </button>
                <button
                  onClick={() => handleRemove(job.id)}
                  disabled={deleteSavedJob.isPending}
                  style={{ padding: '8px 14px', borderRadius: 8, fontSize: 13, border: '1px solid var(--line)', background: 'transparent', color: 'var(--st-rejected)' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
              ) : (
          <EmptyState
            icon="⭐"
            title="No saved jobs yet"
            description="Bookmark jobs from Search to review and apply to them later."
            actionLabel="Search for jobs"
            onAction={() => navigate('/search')}
          />
        )}
    </div>
  );
}

export default SavedJobsPage;