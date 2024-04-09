import { useSortable } from '@dnd-kit/sortable';
import React, { type FC, type ReactNode } from 'react';

interface ISortableWrapperProps {
  children: ReactNode;
  activeId;
  id;
  allClasses: string;
}

const SortableWrapper: FC<ISortableWrapperProps> = ({
  children,
  activeId,
  id,
  allClasses,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id });

  const style =
    transform !== null
      ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : undefined;

  return (
    <div
      className={`${allClasses} ${
        transform !== null && isDragging && activeId !== null
          ? 'opacity-50'
          : ''
      }`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {children}
    </div>
  );
};

export default SortableWrapper;
