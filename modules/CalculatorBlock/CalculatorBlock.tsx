import React, { type FC } from 'react';
import { type CalculationData, type CalculatorItem } from '../../pages/types';
import CalculatorBlockWrapper from '../../ui/wrappers/CalculatorBlockWrapper/CalculatorBlockWrapper';

interface CalculatorBlockProps {
  itemsWithParent: CalculatorItem[];
  isConstructorMode: boolean;
  calculatorData: CalculationData;
  setCalculatorData: (value: CalculationData) => void;
}

const CalculatorBlock: FC<CalculatorBlockProps> = ({
  itemsWithParent,
  isConstructorMode,
  calculatorData,
  setCalculatorData,
}) => {
  return (
    <div className="gap-[12px] flex flex-col mt-[30px]">
      {itemsWithParent.map(el => (
        <CalculatorBlockWrapper
          disabledStatus={false}
          blockType={el.blockType}
          calculatorData={calculatorData}
          setCalculatorData={setCalculatorData}
          isConstructorMode={isConstructorMode}
          key={el.blockType + 'calculatorMode'}
        />
      ))}
    </div>
  );
};

export default CalculatorBlock;
