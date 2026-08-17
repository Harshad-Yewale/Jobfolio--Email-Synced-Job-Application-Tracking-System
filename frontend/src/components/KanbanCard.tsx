import { useDraggable } from '@dnd-kit/core';
import type { Application, ApplicationStatus } from '../types/application';

const TERMINAL_STATUSES: ApplicationStatus[] = ['ACCEPTED', 'REJECTED'];

interface KanbanCardProps {
  application: Application;
  onCardClick: (applicationId: number) => void;
  locked: boolean;
  onLockedDragAttempt: () => void;
}

function KanbanCard({ application, onCardClick, locked, onLockedDragAttempt }: KanbanCardProps) {
  const isTerminal = TERMINAL_STATUSES.includes(application.status);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: application.id,
    disabled: isTerminal || locked,
  });

  const style: React.CSSProperties = {
    background: 'var(--panel)',
    border: '1px solid var(--line)',
    borderRadius: 10,
    padding: 12,
    cursor: isTerminal ? 'pointer' : locked ? 'not-allowed' : 'grab',
    opacity: isDragging ? 0.4 : 1,
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    zIndex: isDragging ? 10 : 'auto',
    position: isDragging ? 'relative' : 'static',
  };

  const handleMouseDown = () => {
    if (locked && !isTerminal) {
      onLockedDragAttempt();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onMouseDown={handleMouseDown}
      onClick={() => onCardClick(application.id)}
    >
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{application.company}</div>
      <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 8 }}>{application.jobTitle}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        {application.lastStatusSource === 'EMAIL_SYNC' && (
          <span style={{ fontSize: 9, background: 'var(--accent-soft)', color: 'var(--accent)', padding: '2px 6px', borderRadius: 20, fontWeight: 700 }}>
            AUTO-DETECTED
          </span>
        )}
        <span className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)' }}>
          {new Date(application.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default KanbanCard;