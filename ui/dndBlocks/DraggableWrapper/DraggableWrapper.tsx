import { useDraggable } from '@dnd-kit/core';
import React, { type FC, type ReactNode } from 'react';
import { type BlockType } from '../../../pages/types';

interface DraggableWrapperProps {
  children: ReactNode;
  blockType: BlockType;
}

const DraggableWrapper: FC<DraggableWrapperProps> = ({ children, blockType }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: blockType,
  });

  return (
    <div ref={setNodeRef} className="cursor-move" {...listeners} {...attributes}>
      {children}
    </div>
  );
};

export default DraggableWrapper;
