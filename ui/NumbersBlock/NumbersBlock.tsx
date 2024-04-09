import React, { type FC } from 'react';
import { type ICalculationData } from '../../pages/types';
import Button from '../Button/Button';
import ShadowContainer from '../ShadowContainer/ShadowContainer';
import SortableWrapper from '../SortableWrapper/SortableWrapper';

interface INumbersBlockProps {
  calculatorData?: ICalculationData;
  setCalculatorData?: (ICalculationDataState) => void;
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

const NumbersBlock: FC<INumbersBlockProps> = ({
  calculatorData = {
    firstNumber: null,
    secondNumber: null,
    operator: null,
    equalButtonPress: false,
    previousOperator: null,
    previousSecondNumber: null,
    currentValueOnDisplay: null,
  },
  setCalculatorData = null,
  disabled,
  dndOpacity = false,
  shadow = true,
  activeId = null,
  id = null,
}) => {
  const { currentValueOnDisplay, equalButtonPress } = calculatorData;
  const numbersAndComma = [
    '7',
    '8',
    '9',
    '4',
    '5',
    '6',
    '1',
    '2',
    '3',
    '0',
    ',',
  ];

  const allClasses = `grid grid-rows-4 grid-cols-3 gap-2 [&>*:nth-child(10)]:w-[152px] [&>*:nth-child(10)]:col-span-2 ${
    dndOpacity && 'opacity-40'
  }`;

  const onClickNumber = (lastValue, newSign): void => {
    if (lastValue?.toString().length === 16) {
      return;
    }

    if (equalButtonPress && setCalculatorData !== null) {
      setCalculatorData({
        ...calculatorData,
        currentValueOnDisplay: newSign.toString(),
        equalButtonPress: false,
      });
      return;
    }

    if (newSign === ',' && lastValue.includes(',') === true) {
      return;
    }

    if (lastValue?.toString()[0] === '0' && setCalculatorData !== null) {
      setCalculatorData({
        ...calculatorData,
        currentValueOnDisplay: newSign.toString(),
      });
      return;
    }

    setCalculatorData !== null &&
      setCalculatorData({
        ...calculatorData,
        currentValueOnDisplay: lastValue?.toString() + newSign?.toString(),
      });
  };

  return (
    <ShadowContainer isActive={shadow}>
      {id !== null ? (
        <SortableWrapper allClasses={allClasses} activeId={activeId} id={id}>
          {numbersAndComma.map(sign => (
            <Button disabled={disabled} text={sign} width="medium" key={sign} />
          ))}
        </SortableWrapper>
      ) : (
        <div className={allClasses}>
          {numbersAndComma.map(sign => (
            <Button
              disabled={disabled}
              text={sign}
              width="medium"
              key={sign}
              onClick={() => {
                onClickNumber(currentValueOnDisplay ?? '', sign);
              }}
            />
          ))}
        </div>
      )}
    </ShadowContainer>
  );
};

export default NumbersBlock;
