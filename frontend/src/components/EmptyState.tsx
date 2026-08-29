interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

function EmptyState({ icon = '📭', title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '48px 24px', color: 'var(--ink-soft)',
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
      {description && <div style={{ fontSize: 13, maxWidth: 320, marginBottom: actionLabel ? 18 : 0 }}>{description}</div>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          style={{ padding: '8px 18px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13 }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;