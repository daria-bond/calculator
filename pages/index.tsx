import React, { useState } from 'react';
import CalculatorBlock from '../modules/CalculatorBlock/CalculatorBlock';
import DndBlock from '../modules/DndBlock/DndBlock';
import MainWrapper from '../ui/wrappers/MainWrapper/MainWrapper';
import SwitchButton from '../ui/buttons/SwitchButton/SwitchButton';
import { type BlockType, type CalculationData, type CalculatorItem } from './types';
import { initCalculatorData } from '../helpers/consts';

export default function HomePage(): JSX.Element {
  const [data, setData] = useState<CalculationData>({
    ...initCalculatorData,
  });
  const [isConstructorMode, setIsConstructorMode] = useState(true);
  const [calculatorItems, setCalculatorItems] = useState<CalculatorItem[]>([
    {
      parent: false,
      blockType: 'display',
    },
    {
      parent: false,
      blockType: 'arithmeticSignsBlock',
    },
    {
      parent: false,
      blockType: 'numbersBlock',
    },
    {
      parent: false,
      blockType: 'equalButton',
    },
  ]);
  const [itemsWithParent, setItemsWithParent] = useState<CalculatorItem[]>([]);
  const [activeBlockType, setActiveBlockType] = useState<BlockType | undefined>(undefined);
  const [dragOverNow, setDragOverNow] = useState(false);

  const onChangeIsConstructorMode = (): void => {
    setIsConstructorMode(!isConstructorMode);
    setData({ ...initCalculatorData });
  };

  return (
    <MainWrapper>
      <SwitchButton
        checked={isConstructorMode}
        setCheck={() => {
          onChangeIsConstructorMode();
        }}
        name="isConstructorMode"
      />
      {isConstructorMode ? (
        <DndBlock
          calculatorItems={calculatorItems}
          setCalculatorItems={setCalculatorItems}
          itemsWithParent={itemsWithParent}
          setItemsWithParent={setItemsWithParent}
          setActiveBlockType={setActiveBlockType}
          setDragOverNow={setDragOverNow}
          activeBlockType={activeBlockType}
          isConstructorMode={isConstructorMode}
          calculatorData={data}
          setCalculatorData={setData}
          dragOverNow={dragOverNow}
        />
      ) : (
        <CalculatorBlock
          itemsWithParent={itemsWithParent}
          isConstructorMode={isConstructorMode}
          calculatorData={data}
          setCalculatorData={setData}
        />
      )}
    </MainWrapper>
  );
}
