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
import React, { useCallback, type FC } from 'react';
import { renderCalculatorBlock } from '../../helpers/renderCalculatorBlock';
import { useDoubleClick } from '../../hooks/useDoubleClick';
import { type ICalculationData, type ICalculatorItem } from '../../pages/types';
import DraggableWrapper from '../../ui/DraggableWrapper/DraggableWrapper';
import DroppableField from '../../ui/DroppableField/DroppableFieldField';
import TransferIcon from './TransferIcon';

interface IDndBlockProps {
  calculatorItems: ICalculatorItem[];
  setCalculatorItems: (value: ICalculatorItem[]) => void;
  itemsWithParent: ICalculatorItem[];
  setItemsWithParent: (value: ICalculatorItem[]) => void;
  activeId:
    | 'display'
    | 'arithmeticSignsBlock'
    | 'numbersBlock'
    | 'equalButton'
    | null;
  setActiveId: any;
  dragOverNow: boolean;
  setDragOverNow: (boolean) => void;
  mode: boolean;
  calculatorData: ICalculationData;
  setCalculatorData: (ICalculationDataState) => void;
}

const DndBlock: FC<IDndBlockProps> = ({
  calculatorItems,
  setCalculatorItems,
  itemsWithParent,
  setItemsWithParent,
  setActiveId,
  setDragOverNow,
  activeId,
  mode,
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

  const handleDragEnd = (event): void => {
    if (event.over !== null && event.over.id === 'A') {
      const addParentItem = {
        ...calculatorItems.find(
          i => i.id === event.active.id && i.parent === '',
        ),
      };

      if (addParentItem.id !== null && addParentItem.parent !== null) {
        const deleteItem = calculatorItems.findIndex(
          i => i.id === event.active.id,
        );
        if (deleteItem !== -1) {
          calculatorItems.splice(deleteItem, 1, {
            parent: 'A',
            id: event.active.id,
          });
          setCalculatorItems([...calculatorItems]);
        }
        if (addParentItem.id !== undefined) {
          if (addParentItem.id === 'display') {
            const newArr: ICalculatorItem = {
              parent: 'A',
              id: addParentItem.id,
            };
            setItemsWithParent([{ ...newArr }, ...itemsWithParent]);
          } else {
            const newArr: ICalculatorItem = {
              parent: 'A',
              id: addParentItem.id,
            };
            setItemsWithParent([...itemsWithParent, { ...newArr }]);
          }
        }
      }
      setCalculatorItems([...calculatorItems]);
    }
    setActiveId(null);
    setDragOverNow(false);
  };

  const handleDragStart = (event): void => {
    setActiveId(event.active.id);
  };

  const hybridClick = useDoubleClick(
    event => {
      setActiveId(event.active.id);
    },
    (event, itemsParent: ICalculatorItem[]) => {
      const deleteIndex = itemsParent.findIndex(
        item => item.id === event.active.id,
      );
      if (deleteIndex !== -1) {
        itemsParent.splice(deleteIndex, 1);
        setItemsWithParent([...itemsParent]);
        const deleteParent = calculatorItems?.find(
          i => i.id === event.active.id,
        );
        if (deleteParent !== undefined) {
          deleteParent.parent = '';
        }
        setCalculatorItems([...calculatorItems]);
      }
    },
    'event',
    [itemsWithParent],
  );

  const handleDragStartSort = (event: DragStartEvent): void => {
    hybridClick(event);
  };

  const handleDragEndSort = useCallback(
    event => {
      if (activeId !== null) {
        const { active, over } = event;

        if (active.id !== over.id) {
          const newItemsWithParent = (): ICalculatorItem[] => {
            const from = itemsWithParent.findIndex(
              item => item.id === active.id,
            );
            const to = itemsWithParent.findIndex(item => item.id === over.id);
            const newArray: ICalculatorItem[] = itemsWithParent.slice();
            newArray.splice(
              to < 0 ? newArray.length + to : to,
              0,
              newArray.splice(from, 1)[0],
            );
            return newArray;
          };

          setItemsWithParent(newItemsWithParent());
        }
        setActiveId(null);
      }
    },
    [activeId, setActiveId, setItemsWithParent],
  );

  const handleDragOver = (event): void => {
    if (event.over !== undefined) {
      setDragOverNow(true);
    } else {
      setDragOverNow(false);
    }
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
    >
      <div className="flex gap-14 items-center mt-[30px]">
        <div className="gap-[12px] flex flex-col">
          {calculatorItems.map(el => {
            if (el.parent === 'A') {
              return renderCalculatorBlock(
                el.id,
                'disabled',
                activeId,
                mode,
                calculatorData,
                setCalculatorData,
                'haveParent',
              );
            } else {
              return (
                <DraggableWrapper id={el.id} key={el.id}>
                  {renderCalculatorBlock(
                    el.id,
                    'standard',
                    activeId,
                    mode,
                    calculatorData,
                    setCalculatorData,
                    'notHaveParent',
                  )}
                </DraggableWrapper>
              );
            }
          })}
        </div>
        <DroppableField
          key={'A'}
          id={'A'}
          quantityChildren={itemsWithParent.length}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={event => {
              handleDragEndSort(event);
            }}
            onDragStart={handleDragStartSort}
          >
            <SortableContext
              items={itemsWithParent}
              strategy={verticalListSortingStrategy}
            >
              {activeId === 'display' &&
              dragOverNow &&
              itemsWithParent.length > 0 ? (
                <TransferIcon />
              ) : null}

              {itemsWithParent.map(el =>
                renderCalculatorBlock(
                  el.id,
                  'withDoubleClick',
                  activeId,
                  mode,
                  calculatorData,
                  setCalculatorData,
                  'sort',
                ),
              )}
              {activeId !== 'display' &&
              dragOverNow &&
              itemsWithParent.length > 0 ? (
                <TransferIcon />
              ) : null}
            </SortableContext>
            <DragOverlay dropAnimation={null}>
              {activeId !== null ? (
                <div className="opacity-50 cursor-move">
                  {renderCalculatorBlock(
                    activeId,
                    'standard',
                    activeId,
                    mode,
                    calculatorData,
                    setCalculatorData,
                    'dragOverlaySort',
                  )}
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </DroppableField>

        <DragOverlay>
          {activeId !== null ? (
            <div className="opacity-70 cursor-move">
              {renderCalculatorBlock(
                activeId,
                'standard',
                activeId,
                mode,
                calculatorData,
                setCalculatorData,
                'dragOverlay',
              )}
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default DndBlock;
