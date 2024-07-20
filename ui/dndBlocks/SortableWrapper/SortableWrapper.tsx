import { useSortable } from '@dnd-kit/sortable';
import React, { type FC, type ReactNode } from 'react';
import { type BlockType } from '../../../pages/types';

interface SortableWrapperProps {
  children: ReactNode;
  activeBlockType?: BlockType;
  blockType: BlockType;
  allClasses: string;
}

const SortableWrapper: FC<SortableWrapperProps> = ({
  children,
  activeBlockType,
  blockType,
  allClasses,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: blockType,
  });

  const style =
    transform !== null
      ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : undefined;

  return (
    <div
      className={`${allClasses} ${
        transform !== null && isDragging && activeBlockType ? 'opacity-50' : ''
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
