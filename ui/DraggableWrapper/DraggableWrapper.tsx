import { useDraggable } from '@dnd-kit/core';
import React, { type FC, type ReactNode } from 'react';
import { type IdWithoutNull } from '../../pages/types';

interface IDraggableWrapperProps {
  children: ReactNode;
  id: IdWithoutNull;
}

const DraggableWrapper: FC<IDraggableWrapperProps> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="cursor-move"
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default DraggableWrapper;
