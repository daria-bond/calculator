import { useDroppable } from '@dnd-kit/core';
import React, { type FC, type ReactNode } from 'react';
import FieldIcon from './FieldIcon';

interface DroppableFieldProps {
  children: ReactNode;
  name: string;
  quantityChildren: number;
}

const DroppableField: FC<DroppableFieldProps> = ({ children, name, quantityChildren }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: name,
  });
  const style = {
    backgroundColor: isOver && quantityChildren === 0 ? '#F0F9FF' : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`w-[243px] h-[448px] flex flex-col justify-center items-center gap-3 ${
        quantityChildren > 0 ? '' : 'border-2 rounded-md border-dashed'
      }`}
    >
      {quantityChildren === 0 && (
        <>
          <FieldIcon />
          <p className="text-[#5D5FEF] text-sm/[17px] font-medium pt-3">Перетащите сюда</p>
          <p className=" text-[#6B7280] font-normal text-xs pt-1 text-center">
            любой элемент
            <br />
            из левой панели
          </p>
        </>
      )}
      {children}
    </div>
  );
};

export default DroppableField;
