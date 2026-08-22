import toast from 'react-hot-toast';
import type { Job } from '../types/job';
import { useCreateApplication } from '../hooks/useApplication';
import { useSaveJob } from '../hooks/useSavedJobs';

interface JobCardProps {
  job: Job;
}

function JobCard({ job }: JobCardProps) {
  const createApplication = useCreateApplication();
  const saveJob = useSaveJob();

  const handleMarkApplied = () => {
    createApplication.mutate(
      {
        jobTitle: job.title,
        company: job.company,
        jobUrl: job.job_url ?? undefined,
        location: job.location ?? undefined,
        source: job.site ?? undefined,
      },
      {
        onSuccess: () => toast.success('Marked as applied'),
        onError: () => toast.error('Could not create application. It may already exist.'),
      },
    );
  };

  const handleSave = () => {
    saveJob.mutate(
      {
        jobTitle: job.title,
        company: job.company,
        jobUrl: job.job_url ?? undefined,
        location: job.location ?? undefined,
        source: job.site ?? undefined,
      },
      {
        onSuccess: () => toast.success('Saved'),
        onError: () => toast.error('Could not save job.'),
      },
    );
  };

  return (
    <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>{job.title}</div>
          <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{job.company}</div>
        </div>
        <button
          onClick={handleSave}
          disabled={saveJob.isPending}
          title="Save for later"
          style={{ background: 'transparent', border: 'none', fontSize: 18, cursor: 'pointer', lineHeight: 1, padding: 4 }}
        >
          {saveJob.isSuccess ? '★' : '☆'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 12, color: 'var(--ink-soft)' }}>
        {job.location && <span>{job.location}</span>}
        {job.site && <span className="mono">{job.site}</span>}
        {job.date_posted && <span>{job.date_posted}</span>}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        {job.job_url ? (
         <a 
            href={job.job_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              padding: '8px 14px',
              borderRadius: 8,
              fontSize: 13,
              border: '1px solid var(--line)',
              background: 'var(--panel)',
              color: 'var(--ink)',
              textAlign: 'center',
              textDecoration: 'none',
            }}
          >
            Apply on {job.site ?? 'site'} ↗
          </a>
        ) : (
          <span style={{ flex: 1, fontSize: 12, color: 'var(--ink-soft)', display: 'flex', alignItems: 'center' }}>
            No link available
          </span>
        )}

        <button
          onClick={handleMarkApplied}
          disabled={job.alreadyApplied || createApplication.isPending}
          style={{
            flex: 1,
            padding: '8px 14px',
            borderRadius: 8,
            fontSize: 13,
            border: job.alreadyApplied ? '1px solid var(--line)' : 'none',
            background: job.alreadyApplied ? 'var(--bg)' : 'var(--accent)',
            color: job.alreadyApplied ? 'var(--ink-soft)' : '#fff',
            cursor: job.alreadyApplied ? 'default' : 'pointer',
          }}
        >
          {job.alreadyApplied ? '✓ Applied' : createApplication.isPending ? 'Adding...' : 'Mark Applied'}
        </button>
      </div>
    </div>
  );
}

export default JobCard;