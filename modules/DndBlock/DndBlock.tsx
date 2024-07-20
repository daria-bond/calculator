import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React, { useCallback, type FC, useMemo } from 'react';
import { useDoubleClick } from '../../hooks/useDoubleClick';
import { type BlockType, type CalculationData, type CalculatorItem } from '../../pages/types';
import DraggableWrapper from '../../ui/dndBlocks/DraggableWrapper/DraggableWrapper';
import DroppableField from '../../ui/dndBlocks/DroppableField/DroppableField';
import TransferIcon from './TransferIcon';
import CalculatorBlockWrapper from '../../ui/wrappers/CalculatorBlockWrapper/CalculatorBlockWrapper';

interface DndBlockProps {
  calculatorItems: CalculatorItem[];
  setCalculatorItems: (arg: CalculatorItem[]) => void;
  itemsWithParent: CalculatorItem[];
  setItemsWithParent: (arg: CalculatorItem[]) => void;
  activeBlockType?: BlockType;
  setActiveBlockType: (arg: BlockType | undefined) => void;
  dragOverNow: boolean;
  setDragOverNow: (arg: boolean) => void;
  isConstructorMode: boolean;
  calculatorData: CalculationData;
  setCalculatorData: (arg: CalculationData) => void;
}

const DndBlock: FC<DndBlockProps> = ({
  calculatorItems,
  setCalculatorItems,
  itemsWithParent,
  setItemsWithParent,
  setActiveBlockType,
  setDragOverNow,
  activeBlockType,
  isConstructorMode,
  calculatorData,
  setCalculatorData,
  dragOverNow,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const withTransfer = useMemo(() => {
    return dragOverNow && itemsWithParent.length > 0;
  }, [dragOverNow, itemsWithParent.length]);

  const itemsWithParentSortable = useMemo(
    () => itemsWithParent.map(item => ({ id: item.blockType })),
    [itemsWithParent],
  );

  const handleDragEnd = (event): void => {
    if (event.over?.id === 'container') {
      const addParentItem = {
        ...calculatorItems.find(item => item.blockType === event.active.id && !item.parent),
      };

      if (addParentItem.blockType && !addParentItem.parent) {
        const deleteItem = calculatorItems.findIndex(i => i.blockType === event.active.id);
        if (deleteItem !== -1) {
          calculatorItems.splice(deleteItem, 1, {
            parent: true,
            blockType: event.active.id,
          });
          setCalculatorItems([...calculatorItems]);
        }
        if (addParentItem.blockType === 'display') {
          const newArr: CalculatorItem = {
            parent: true,
            blockType: addParentItem.blockType,
          };
          setItemsWithParent([{ ...newArr }, ...itemsWithParent]);
        } else {
          const newArr: CalculatorItem = {
            parent: true,
            blockType: addParentItem.blockType,
          };
          setItemsWithParent([...itemsWithParent, { ...newArr }]);
        }
      }
      setCalculatorItems([...calculatorItems]);
    }
    setActiveBlockType(undefined);
    setDragOverNow(false);
  };

  const handleDragStart = (event): void => {
    setActiveBlockType(event.active.id);
  };

  const hybridClick = useDoubleClick(
    event => {
      setActiveBlockType(event.active.id);
    },
    event => {
      const deleteIndex = itemsWithParent.findIndex(item => item.blockType === event.active.id);
      if (deleteIndex !== -1) {
        itemsWithParent.splice(deleteIndex, 1);
        setItemsWithParent([...itemsWithParent]);
        const deleteParent = calculatorItems?.find(i => i.blockType === event.active.id);
        if (deleteParent !== undefined) {
          deleteParent.parent = false;
        }
        setCalculatorItems([...calculatorItems]);
      }
    },
  );

  const handleDragStartSort = (event: DragStartEvent): void => {
    hybridClick(event);
  };

  const handleDragEndSort = useCallback(
    event => {
      if (activeBlockType !== undefined) {
        const { active, over } = event;

        if (active.id !== over.id) {
          const newItemsWithParent = (): CalculatorItem[] => {
            const from = itemsWithParent.findIndex(item => item.blockType === active.id);
            const to = itemsWithParent.findIndex(item => item.blockType === over.id);
            const newArray: CalculatorItem[] = itemsWithParent.slice();
            newArray.splice(to < 0 ? newArray.length - 1 : to, 0, newArray.splice(from, 1)[0]);
            return newArray;
          };

          setItemsWithParent(newItemsWithParent());
        }
        setActiveBlockType(undefined);
      }
    },
    [activeBlockType, setActiveBlockType, setItemsWithParent],
  );

  const handleDragOver = (event): void => {
    if (event.over !== undefined) {
      setDragOverNow(true);
    } else {
      setDragOverNow(false);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragOver={handleDragOver}>
      <div className="flex gap-14 items-center mt-[30px]">
        <div className="gap-[12px] flex flex-col">
          {calculatorItems.map(el => {
            if (el.parent) {
              return (
                <CalculatorBlockWrapper
                  blockType={el.blockType}
                  disabledStatus={true}
                  calculatorData={calculatorData}
                  setCalculatorData={setCalculatorData}
                  isConstructorMode={isConstructorMode}
                  key={el.blockType + 'disabled'}
                />
              );
            } else {
              return (
                <DraggableWrapper blockType={el.blockType} key={el.blockType + 'standard'}>
                  <CalculatorBlockWrapper
                    blockType={el.blockType}
                    disabledStatus={false}
                    calculatorData={calculatorData}
                    setCalculatorData={setCalculatorData}
                    isConstructorMode={isConstructorMode}
                  />
                </DraggableWrapper>
              );
            }
          })}
        </div>
        <DroppableField key={'A'} name={'container'} quantityChildren={itemsWithParent.length}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={event => {
              handleDragEndSort(event);
            }}
            onDragStart={handleDragStartSort}
          >
            <SortableContext items={itemsWithParentSortable} strategy={verticalListSortingStrategy}>
              {activeBlockType === 'display' && withTransfer && <TransferIcon />}

              {itemsWithParent.map(el => (
                <CalculatorBlockWrapper
                  withDoubleClickStatus={true}
                  blockType={el.blockType}
                  key={el.blockType + 'withDoubleClick'}
                  activeBlockType={activeBlockType}
                />
              ))}
              {withTransfer && activeBlockType !== 'display' && <TransferIcon />}
            </SortableContext>
            <DragOverlay dropAnimation={null}>
              {activeBlockType && (
                <div className="opacity-50 cursor-move">
                  <CalculatorBlockWrapper
                    disabledStatus={false}
                    blockType={activeBlockType}
                    calculatorData={calculatorData}
                    setCalculatorData={setCalculatorData}
                    isConstructorMode={isConstructorMode}
                  />
                </div>
              )}
            </DragOverlay>
          </DndContext>
        </DroppableField>

        <DragOverlay>
          {activeBlockType && (
            <div className="opacity-70 cursor-move">
              <CalculatorBlockWrapper
                disabledStatus={false}
                blockType={activeBlockType}
                calculatorData={calculatorData}
                setCalculatorData={setCalculatorData}
                isConstructorMode={isConstructorMode}
              />
            </div>
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default DndBlock;
