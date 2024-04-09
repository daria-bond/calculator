import React, { useState } from 'react';
import CalculatorBlock from '../modules/CalculatorBlock/CalculatorBlock';
import DndBlock from '../modules/DndBlock/DndBlock';
import MainWrapper from '../ui/MainWrapper/MainWrapper';
import SwitchButton from '../ui/SwitchButton/SwitchButton';
import {
  type ICalculationData,
  type ICalculatorItem,
  type IdWithNull,
} from './types';

export default function HomePage(): JSX.Element {
  const [calculatorData, setCalculatorData] = useState<ICalculationData>({
    firstNumber: null,
    secondNumber: null,
    operator: null,
    equalButtonPress: false,
    previousOperator: null,
    previousSecondNumber: null,
    currentValueOnDisplay: 0,
  });
  const [mode, setMode] = useState(true);
  const [calculatorItems, setCalculatorItems] = useState<ICalculatorItem[]>([
    {
      parent: '',
      id: 'display',
    },
    {
      parent: '',
      id: 'arithmeticSignsBlock',
    },
    {
      parent: '',
      id: 'numbersBlock',
    },
    {
      parent: '',
      id: 'equalButton',
    },
  ]);
  const [itemsWithParent, setItemsWithParent] = useState<ICalculatorItem[]>([]);
  const [activeId, setActiveId] = useState<IdWithNull>(null);
  const [dragOverNow, setDragOverNow] = useState(false);

  const onModeChange = (): void => {
    setMode(!mode);
    setCalculatorData({
      firstNumber: null,
      secondNumber: null,
      operator: null,
      equalButtonPress: false,
      previousOperator: null,
      previousSecondNumber: null,
      currentValueOnDisplay: 0,
    });
  };

  return (
    <MainWrapper>
      <SwitchButton
        checked={mode}
        setCheck={() => {
          onModeChange();
        }}
        name="mode"
      />
      {mode ? (
        <DndBlock
          calculatorItems={calculatorItems}
          setCalculatorItems={setCalculatorItems}
          itemsWithParent={itemsWithParent}
          setItemsWithParent={setItemsWithParent}
          setActiveId={setActiveId}
          setDragOverNow={setDragOverNow}
          activeId={activeId}
          mode={mode}
          calculatorData={calculatorData}
          setCalculatorData={setCalculatorData}
          dragOverNow={dragOverNow}
        />
      ) : (
        <CalculatorBlock
          itemsWithParent={itemsWithParent}
          activeId={activeId}
          mode={mode}
          calculatorData={calculatorData}
          setCalculatorData={setCalculatorData}
        />
      )}
    </MainWrapper>
  );
}
