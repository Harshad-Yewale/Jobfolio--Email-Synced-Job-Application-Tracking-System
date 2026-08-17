import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import type { Application, ApplicationStatus } from '../types/application';
import KanbanColumn from './KanbanColumn';

const COLUMN_ORDER: ApplicationStatus[] = [
  'APPLIED', 'RECEIVED', 'ASSESSMENT', 'INTERVIEW', 'OFFER', 'ACCEPTED', 'REJECTED',
];

interface KanbanBoardProps {
  applications: Application[];
  onDropApplication: (applicationId: number, newStatus: ApplicationStatus) => void;
  onCardClick: (applicationId: number) => void;
  locked: boolean;
  onLockedDragAttempt: () => void;
}

function KanbanBoard({ applications, onDropApplication, onCardClick, locked, onLockedDragAttempt }: KanbanBoardProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    if (locked) return;
    const { active, over } = event;
    if (!over) return;

    const applicationId = Number(active.id);
    const newStatus = over.id as ApplicationStatus;
    const application = applications.find((app) => app.id === applicationId);

    if (!application || application.status === newStatus) return;

    onDropApplication(applicationId, newStatus);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: 12, paddingBottom: 8, width: 'max-content' }}>
        {COLUMN_ORDER.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            applications={applications.filter((app) => app.status === status)}
            onCardClick={onCardClick}
            locked={locked}
            onLockedDragAttempt={onLockedDragAttempt}
          />
        ))}
      </div>
    </DndContext>
  );
}

export default KanbanBoard;