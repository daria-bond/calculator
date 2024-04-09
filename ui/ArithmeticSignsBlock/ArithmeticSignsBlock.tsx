import React, { type FC } from 'react';
import { countCalculationResult } from '../../helpers/countCalculationResult';
import {
  type ICalculationData,
  type IdWithNull,
  type Operator,
} from '../../pages/types';
import Button from '../Button/Button';
import ShadowContainer from '../ShadowContainer/ShadowContainer';
import SortableWrapper from '../SortableWrapper/SortableWrapper';

interface IArithmeticSignsBlockProps {
  calculatorData?: ICalculationData;
  setCalculatorData?: (value: ICalculationData) => void;
  disabled: boolean;
  dndOpacity?: boolean;
  shadow?: boolean;
  activeId?: IdWithNull;
  id?: IdWithNull;
}

const ArithmeticSignsBlock: FC<IArithmeticSignsBlockProps> = ({
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
  const { currentValueOnDisplay, firstNumber, operator } = calculatorData;

  const arithmeticInfo = [
    { sign: '/', word: 'division' },
    { sign: 'x', word: 'multiplication' },
    { sign: '-', word: 'subtraction' },
    { sign: '+', word: 'addition' },
  ];

  const allClasses = `justify-between flex ${dndOpacity && 'opacity-40'} gap-2`;

  const reCount = (
    word,
    firstNumber: number,
    currentValueOnDisplay,
    operator: Operator,
  ): void => {
    setCalculatorData !== null &&
      setCalculatorData({
        ...calculatorData,
        firstNumber: countCalculationResult(
          firstNumber,
          Number(currentValueOnDisplay.replace(',', '.')),
          operator,
        ),
        currentValueOnDisplay: null,
        secondNumber: null,
        operator: word,
        previousOperator: operator,
        previousSecondNumber: Number(
          currentValueOnDisplay.toString().replace(',', '.'),
        ),
      });
  };

  const addOperator = (word, currentValueOnDisplay): void => {
    setCalculatorData !== null &&
      setCalculatorData({
        ...calculatorData,
        firstNumber: Number(currentValueOnDisplay.toString().replace(',', '.')),
        currentValueOnDisplay: null,
        operator: word,
      });
  };

  const changeOperator = (word): void => {
    setCalculatorData !== null &&
      setCalculatorData({
        ...calculatorData,
        operator: word,
      });
  };

  const onClick = (
    word,
    firstNumber: number | null,
    currentValueOnDisplay,
    operator: Operator,
  ): void => {
    if (firstNumber === null) {
      addOperator(word, currentValueOnDisplay);
    }

    if (firstNumber !== null && currentValueOnDisplay === null) {
      changeOperator(word);
    }

    if (firstNumber !== null && currentValueOnDisplay !== null) {
      reCount(word, firstNumber, currentValueOnDisplay, operator);
    }
  };

  return (
    <ShadowContainer isActive={shadow}>
      {id !== null ? (
        <SortableWrapper allClasses={allClasses} activeId={activeId} id={id}>
          {arithmeticInfo.map(info => (
            <Button disabled={disabled} text={info.sign} key={info.word} />
          ))}
        </SortableWrapper>
      ) : (
        <div className={allClasses}>
          {arithmeticInfo.map(info => (
            <Button
              disabled={disabled}
              text={info.sign}
              key={info.word}
              onClick={() => {
                onClick(
                  info.word,
                  firstNumber,
                  currentValueOnDisplay,
                  operator,
                );
              }}
            />
          ))}
        </div>
      )}
    </ShadowContainer>
  );
};

export default ArithmeticSignsBlock;
