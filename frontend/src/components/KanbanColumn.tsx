import { useDroppable } from '@dnd-kit/core';
import type { Application, ApplicationStatus } from '../types/application';
import { statusConfig } from './StatusBadge';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  status: ApplicationStatus;
  applications: Application[];
  onCardClick: (applicationId: number) => void;
  locked: boolean;
  onLockedDragAttempt: () => void;
}

function KanbanColumn({ status, applications, onCardClick, locked, onLockedDragAttempt }: KanbanColumnProps) {
  const config = statusConfig[status];
  const { setNodeRef, isOver } = useDroppable({ id: status, disabled: locked });

  return (
    <div
      ref={setNodeRef}
      style={{
        background: isOver && !locked ? 'var(--accent-soft)' : 'var(--bg)',
        borderRadius: 12,
        padding: 12,
        minWidth: 220,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        transition: 'background 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: config.color }} />
        <span style={{ fontSize: 13, fontWeight: 600 }}>{config.label}</span>
        <span className="mono" style={{ fontSize: 12, color: 'var(--ink-soft)', marginLeft: 'auto' }}>
          {applications.length}
        </span>
      </div>

      {applications.map((app) => (
        <KanbanCard
          key={app.id}
          application={app}
          onCardClick={onCardClick}
          locked={locked}
          onLockedDragAttempt={onLockedDragAttempt}
        />
      ))}
    </div>
  );
}

export default KanbanColumn;