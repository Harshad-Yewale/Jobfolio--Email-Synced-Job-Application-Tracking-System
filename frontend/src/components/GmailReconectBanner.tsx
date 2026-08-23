import { useEmailStatus } from '../hooks/useEmailConnection';
import * as emailApi from '../api/emailApi';

function GmailReconnectBanner() {
  const { data: status, isError } = useEmailStatus();

  // Not connected at all (status 404s) or connected but expiring soon
  const notConnected = isError;
  const expiringSoon = status?.needsReconnectSoon;

  if (!notConnected && !expiringSoon) return null;

  const message = notConnected
    ? 'Connect Gmail to automatically detect application status updates from your inbox.'
    : `Your Gmail connection expires in ${status?.daysUntilLikelyExpiry} day${status?.daysUntilLikelyExpiry === 1 ? '' : 's'} — reconnect to keep auto-sync working.`;

  return (
    <div
      style={{
        background: 'var(--accent-soft)',
        border: '1px solid var(--accent)',
        borderRadius: 10,
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
        flexWrap: 'wrap',
      }}
    >
      <span style={{ fontSize: 13, color: 'var(--ink)' }}>{message}</span>
      <button
        onClick={() => emailApi.connectGmail()}
        style={{ padding: '6px 14px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, whiteSpace: 'nowrap' }}
      >
        {notConnected ? 'Connect Gmail' : 'Reconnect'}
      </button>
    </div>
  );
}

export default GmailReconnectBanner;