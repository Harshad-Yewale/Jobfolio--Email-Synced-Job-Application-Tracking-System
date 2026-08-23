import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import {
  useEmailStatus, usePauseSync, useResumeSync, useDisconnectEmail, useSyncNow,
} from '../hooks/useEmailConnection';
import * as emailApi from '../api/emailApi';

function SettingsPage() {
  const { user } = useAuthStore();
  const { data: status, isLoading, isError } = useEmailStatus();
  const pauseSync = usePauseSync();
  const resumeSync = useResumeSync();
  const disconnectEmail = useDisconnectEmail();
  const syncNow = useSyncNow();
  const [searchParams, setSearchParams] = useSearchParams();

  // Handles the redirect back from Google (see connectGmail's window.location.href flow)
  useEffect(() => {
    if (searchParams.get('gmail') === 'connected') {
      toast.success('Gmail connected!');
      searchParams.delete('gmail');
      setSearchParams(searchParams, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notConnected = isError;

  return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22 }}>Settings</h1>
        <p style={{ color: 'var(--ink-soft)', margin: '4px 0 0' }}>
          Manage your account and Gmail connection.
        </p>
      </div>

      <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, marginBottom: 12 }}>Profile</h3>
        <div style={{ fontSize: 14, marginBottom: 4 }}>{user?.fullName}</div>
        <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{user?.email}</div>
      </div>

      <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 12, padding: 20 }}>
        <h3 style={{ fontSize: 15, marginBottom: 16 }}>Gmail connection</h3>

        {isLoading ? (
          <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Checking connection...</p>
        ) : notConnected ? (
          <>
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 14 }}>
              Not connected. Connect Gmail to automatically detect status changes (interview invites, offers, rejections) from your inbox.
            </p>
            <button
              onClick={() => emailApi.connectGmail()}
              style={{ padding: '8px 16px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13 }}
            >
              Connect Gmail
            </button>
          </>
        ) : status ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16, fontSize: 13 }}>
              <div><strong>Account:</strong> {status.emailAddress}</div>
              <div>
                <strong>Sync:</strong>{' '}
                <span style={{ color: status.syncEnabled ? 'var(--st-offer)' : 'var(--ink-soft)' }}>
                  {status.syncEnabled ? 'Active' : 'Paused'}
                </span>
              </div>
              <div className="mono">
                <strong style={{ fontFamily: 'var(--font-body)' }}>Last synced:</strong>{' '}
                {status.lastSyncedAt ? new Date(status.lastSyncedAt).toLocaleString() : 'Never'}
              </div>
              {status.needsReconnectSoon && (
                <div style={{ color: 'var(--st-assessment)' }}>
                  ⚠ Expires in {status.daysUntilLikelyExpiry} day{status.daysUntilLikelyExpiry === 1 ? '' : 's'} — reconnect soon.
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                onClick={() =>
                  syncNow.mutate(undefined, {
                    onSuccess: () => toast.success('Sync triggered'),
                    onError: () => toast.error('Sync failed'),
                  })
                }
                disabled={syncNow.isPending}
                style={{ padding: '7px 14px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13 }}
              >
                {syncNow.isPending ? 'Syncing...' : 'Sync now'}
              </button>

              {status.syncEnabled ? (
                <button
                  onClick={() =>
                    pauseSync.mutate(undefined, {
                      onSuccess: () => toast.success('Sync paused'),
                      onError: () => toast.error('Could not pause sync'),
                    })
                  }
                  disabled={pauseSync.isPending}
                  style={{ padding: '7px 14px', background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 8, fontSize: 13 }}
                >
                  Pause
                </button>
              ) : (
                <button
                  onClick={() =>
                    resumeSync.mutate(undefined, {
                      onSuccess: () => toast.success('Sync resumed'),
                      onError: () => toast.error('Could not resume sync'),
                    })
                  }
                  disabled={resumeSync.isPending}
                  style={{ padding: '7px 14px', background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 8, fontSize: 13 }}
                >
                  Resume
                </button>
              )}

              <button
                onClick={() => {
                  if (!confirm('Disconnect Gmail? You will need to reconnect to use auto-sync again.')) return;
                  disconnectEmail.mutate(undefined, {
                    onSuccess: () => toast.success('Disconnected'),
                    onError: () => toast.error('Could not disconnect'),
                  });
                }}
                disabled={disconnectEmail.isPending}
                style={{ padding: '7px 14px', background: 'transparent', border: '1px solid var(--line)', borderRadius: 8, fontSize: 13, color: 'var(--st-rejected)' }}
              >
                Disconnect
              </button>

              {status.needsReconnectSoon && (
                <button
                  onClick={() => emailApi.connectGmail()}
                  style={{ padding: '7px 14px', background: 'var(--accent-soft)', color: 'var(--accent)', border: 'none', borderRadius: 8, fontSize: 13 }}
                >
                  Reconnect
                </button>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default SettingsPage;