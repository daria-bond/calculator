import React, { type FC } from 'react';
import { renderCalculatorBlock } from '../../helpers/renderCalculatorBlock';
import {
  type ICalculationData,
  type ICalculatorItem,
  type IdWithNull,
} from '../../pages/types';

interface ICalculatorBlockProps {
  itemsWithParent: ICalculatorItem[];
  activeId: IdWithNull;
  mode: boolean;
  calculatorData: ICalculationData;
  setCalculatorData: (value: ICalculationData) => void;
}

const CalculatorBlock: FC<ICalculatorBlockProps> = ({
  itemsWithParent,
  activeId,
  mode,
  calculatorData,
  setCalculatorData,
}) => {
  return (
    <div className="gap-[12px] flex flex-col mt-[30px]">
      {itemsWithParent.map(el =>
        renderCalculatorBlock(
          el.id,
          'standard',
          activeId,
          mode,
          calculatorData,
          setCalculatorData,
          'calculatorMode',
        ),
      )}
    </div>
  );
};

export default CalculatorBlock;
