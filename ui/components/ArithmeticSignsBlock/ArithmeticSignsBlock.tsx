import React, { type FC, useCallback } from 'react';
import { countCalculationResult } from '../../../helpers/countCalculationResult';
import { type BlockType, type CalculationData, type Operator } from '../../../pages/types';
import Button from '../../buttons/Button/Button';
import ShadowWrapper from '../../wrappers/ShadowWrapper/ShadowWrapper';
import SortableWrapper from '../../dndBlocks/SortableWrapper/SortableWrapper';
import { calculatorDataWithUndefinedValueOnDisplay } from '../../../helpers/consts';
import { stringToNumber } from '../../../helpers/functions';

interface ArithmeticSignsBlockProps {
  calculatorData?: CalculationData;
  setCalculatorData?: (value: CalculationData) => void;
  disabled: boolean;
  dndOpacity?: boolean;
  shadow?: boolean;
  activeBlockType?: BlockType;
  blockType?: BlockType;
}

const ArithmeticSignsBlock: FC<ArithmeticSignsBlockProps> = ({
  calculatorData = { ...calculatorDataWithUndefinedValueOnDisplay },
  setCalculatorData,
  disabled,
  dndOpacity = false,
  shadow = true,
  activeBlockType,
  blockType,
}) => {
  const { currentValueOnDisplay, firstNumber, operator } = calculatorData;

  const arithmeticInfo: Array<{ sign: '/' | 'x' | '-' | '+'; word: Operator }> = [
    { sign: '/', word: 'division' },
    { sign: 'x', word: 'multiplication' },
    { sign: '-', word: 'subtraction' },
    { sign: '+', word: 'addition' },
  ];

  const allClasses = `justify-between flex ${dndOpacity && 'opacity-40'} gap-2`;

  const reCount = useCallback(
    (
      word: Operator,
      firstNumber: number,
      currentValueOnDisplay: string,
      operator: Operator,
    ): void => {
      setCalculatorData &&
        setCalculatorData({
          ...calculatorData,
          firstNumber: countCalculationResult(
            firstNumber,
            stringToNumber(currentValueOnDisplay),
            operator,
          ),
          currentValueOnDisplay: undefined,
          secondNumber: undefined,
          operator: word,
          previousOperator: operator,
          previousSecondNumber: stringToNumber(currentValueOnDisplay),
        });
    },
    [],
  );

  const addOperator = (word: Operator, currentValueOnDisplay: string): void => {
    setCalculatorData &&
      setCalculatorData({
        ...calculatorData,
        firstNumber: stringToNumber(currentValueOnDisplay),
        currentValueOnDisplay: undefined,
        operator: word,
      });
  };

  const changeOperator = (word: Operator): void => {
    setCalculatorData &&
      setCalculatorData({
        ...calculatorData,
        operator: word,
      });
  };

  const onClick = (
    word: Operator,
    firstNumber: number | undefined,
    currentValueOnDisplay: string | undefined,
    operator: Operator | undefined,
  ): void => {
    if (firstNumber === undefined && currentValueOnDisplay !== undefined) {
      addOperator(word, currentValueOnDisplay);
      return;
    }

    if (firstNumber !== undefined && currentValueOnDisplay === undefined) {
      changeOperator(word);
      return;
    }

    if (firstNumber !== undefined && currentValueOnDisplay !== undefined && operator) {
      reCount(word, firstNumber, currentValueOnDisplay, operator);
    }
  };

  return (
    <ShadowWrapper isActive={shadow}>
      {blockType !== undefined ? (
        <SortableWrapper
          allClasses={allClasses}
          activeBlockType={activeBlockType}
          blockType={blockType}
        >
          {arithmeticInfo.map(el => (
            <Button disabled={disabled} text={el.sign} key={el.word} />
          ))}
        </SortableWrapper>
      ) : (
        <div className={allClasses}>
          {arithmeticInfo.map(info => (
            <Button
              disabled={disabled}
              text={info.sign}
              key={info.word}
              isCursorDefault={dndOpacity}
              onClick={() => {
                onClick(info.word, firstNumber, currentValueOnDisplay, operator);
              }}
            />
          ))}
        </div>
      )}
    </ShadowWrapper>
  );
};

export default ArithmeticSignsBlock;
