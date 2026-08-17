import { useState } from 'react';
import toast from 'react-hot-toast';
import { useCreateApplication } from '../hooks/useApplication';

interface AddApplicationModalProps {
  onClose: () => void;
}

function AddApplicationModal({ onClose }: AddApplicationModalProps) {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [location, setLocation] = useState('');
  const [source, setSource] = useState('');
  const [error, setError] = useState('');
  const createApplication = useCreateApplication();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await createApplication.mutateAsync({
        jobTitle,
        company,
        jobUrl: jobUrl || undefined,
        location: location || undefined,
        source: source || undefined,
      });
      toast.success('Application added');
      onClose();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? 'Could not create application. Check the fields and try again.';
      setError(message);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'var(--panel)', borderRadius: 12, padding: 24, width: 400 }}
      >
        <h3 style={{ fontSize: 16, marginBottom: 16 }}>Add application</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 13 }}>Job title *</label>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 13 }}>Company *</label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 13 }}>Job URL</label>
            <input
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 13 }}>Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13 }}>Source</label>
            <input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g. LinkedIn, referral, company site"
              style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
            />
          </div>

          {error && <p style={{ color: 'var(--st-rejected)', fontSize: 13, marginBottom: 12 }}>{error}</p>}

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{ padding: '8px 14px', background: 'transparent', border: '1px solid var(--line)', borderRadius: 8 }}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={createApplication.isPending}
              style={{ padding: '8px 14px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8 }}
            >
              {createApplication.isPending ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddApplicationModal;