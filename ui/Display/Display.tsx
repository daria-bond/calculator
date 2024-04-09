import React, { useMemo, type FC } from 'react';
import { type ICalculationData } from '../../pages/types';
import ShadowContainer from '../ShadowContainer/ShadowContainer';
import SortableWrapper from '../SortableWrapper/SortableWrapper';

interface DisplayProps {
  calculatorData?: ICalculationData;
  disabled: boolean;
  dndOpacity?: boolean;
  shadow?: boolean;
  activeId?:
    | 'display'
    | 'arithmeticSignsBlock'
    | 'numbersBlock'
    | 'equalButton'
    | null;
  id?:
    | 'display'
    | 'arithmeticSignsBlock'
    | 'numbersBlock'
    | 'equalButton'
    | null;
}

const Display: FC<DisplayProps> = ({
  calculatorData = {
    firstNumber: null,
    secondNumber: null,
    operator: null,
    equalButtonPress: false,
    previousOperator: null,
    previousSecondNumber: null,
    currentValueOnDisplay: null,
  },
  disabled,
  dndOpacity = false,
  shadow = true,
  activeId = null,
  id = null,
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
  ${dndOpacity && 'opacity-40'}
  
  `;

  return (
    <ShadowContainer isActive={shadow}>
      {id !== null ? (
        <SortableWrapper allClasses={allClasses} activeId={activeId} id={id}>
          {valueOnDisplay}
        </SortableWrapper>
      ) : (
        <div className={allClasses}>{valueOnDisplay}</div>
      )}
    </ShadowContainer>
  );
};

export default Display;

const calculateSizeFont = (firstNumber, currentValueOnDisplay): string => {
  if (currentValueOnDisplay === null && firstNumber === null) {
    return 'text-4xl';
  }

  const textLength =
    currentValueOnDisplay === null
      ? firstNumber.toString().length
      : currentValueOnDisplay.toString().length;

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

const changeValueOnDisplay = (currentValueOnDisplay, firstNumber): string => {
  if (currentValueOnDisplay === null && firstNumber === null) {
    return '0';
  }
  if (currentValueOnDisplay === null) {
    return firstNumber?.toString().replace('.', ',');
  }
  return currentValueOnDisplay?.toString().replace('.', ',');
};
