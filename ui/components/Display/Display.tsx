import React, { useMemo, type FC } from 'react';
import { type BlockType, type CalculationData } from '../../../pages/types';
import ShadowWrapper from '../../wrappers/ShadowWrapper/ShadowWrapper';
import SortableWrapper from '../../dndBlocks/SortableWrapper/SortableWrapper';
import { calculatorDataWithUndefinedValueOnDisplay } from '../../../helpers/consts';
import { numberToString } from '../../../helpers/functions';

interface DisplayProps {
  calculatorData?: CalculationData;
  disabled: boolean;
  dndOpacity?: boolean;
  shadow?: boolean;
  activeBlockType?: BlockType;
  blockType?: BlockType;
}

const Display: FC<DisplayProps> = ({
  calculatorData = { ...calculatorDataWithUndefinedValueOnDisplay },
  disabled,
  dndOpacity = false,
  shadow = true,
  activeBlockType,
  blockType,
}) => {
  const { currentValueOnDisplay, firstNumber } = calculatorData;

  const valueOnDisplay = useMemo(
    () => changeValueOnDisplay(currentValueOnDisplay, firstNumber),
    [currentValueOnDisplay, firstNumber],
  );

  const sizeFont = useMemo(
    () => calculateSizeFont(firstNumber, currentValueOnDisplay),
    [currentValueOnDisplay, firstNumber],
  );

  const allClasses = `bg-gray-100 h-[52px] w-[232px] rounded-md text-right font-extrabold px-2 py-1 overflow-hidden content-center ${sizeFont} 
  ${disabled ? 'text-slate-500' : 'text-gray-900'} 
  ${dndOpacity && 'opacity-40 cursor-default'}
  
  `;

  return (
    <ShadowWrapper isActive={shadow}>
      {blockType ? (
        <SortableWrapper
          allClasses={allClasses}
          activeBlockType={activeBlockType}
          blockType={blockType}
        >
          {valueOnDisplay}
        </SortableWrapper>
      ) : (
        <div className={allClasses}>{valueOnDisplay}</div>
      )}
    </ShadowWrapper>
  );
};

const calculateSizeFont = (
  firstNumber: number | undefined,
  currentValueOnDisplay: string | undefined,
): string => {
  if (currentValueOnDisplay === undefined && firstNumber === undefined) {
    return 'text-4xl';
  }

  const textLength =
    currentValueOnDisplay === undefined
      ? firstNumber?.toString().length
      : currentValueOnDisplay.length;

  if (textLength === undefined) {
    return 'text-4xl';
  }
  if (textLength <= 9) {
    return 'text-4xl';
  }
  if (textLength > 9 && textLength < 14) {
    return 'text-2xl';
  }
  if (textLength >= 14) {
    return 'text-xl';
  }
  return '';
};

const changeValueOnDisplay = (
  currentValueOnDisplay: string | undefined,
  firstNumber: number | undefined,
): string => {
  if (currentValueOnDisplay === undefined && firstNumber === undefined) {
    return '0';
  }
  if (currentValueOnDisplay === undefined && firstNumber !== undefined) {
    return numberToString(firstNumber);
  }
  if (currentValueOnDisplay !== undefined) {
    return currentValueOnDisplay.replace('.', ',');
  }
  return 'error';
};

export default Display;
