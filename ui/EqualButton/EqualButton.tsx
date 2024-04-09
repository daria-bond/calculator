import React, { useCallback, type FC } from 'react';
import { countCalculationResult } from '../../helpers/countCalculationResult';
import { type ICalculationData, type Operator } from '../../pages/types';
import Button from '../Button/Button';
import ShadowContainer from '../ShadowContainer/ShadowContainer';
import SortableWrapper from '../SortableWrapper/SortableWrapper';

interface IEqualButtonProps {
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

const EqualButton: FC<IEqualButtonProps> = ({
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
  const {
    firstNumber,
    operator,
    previousOperator,
    previousSecondNumber,
    currentValueOnDisplay,
  } = calculatorData;

  const allClasses = `${dndOpacity ? 'opacity-40 w-[232px]' : 'w-[232px]'}`;

  const onClickEqualButton = useCallback(
    (
      currentValueOnDisplay: number | null,
      firstNumber: number | null,
      operator: Operator,
      previousOperator: Operator,
      previousSecondNumber: number | null,
    ) => {
      if (
        firstNumber === null &&
        currentValueOnDisplay !== null &&
        previousOperator !== null &&
        previousSecondNumber !== null
      ) {
        setCalculatorData !== null &&
          setCalculatorData({
            ...calculatorData,
            currentValueOnDisplay: countCalculationResult(
              currentValueOnDisplay,
              previousSecondNumber,
              previousOperator,
            ),
            equalButtonPress: true,
          });
        return;
      }

      if (firstNumber === null && currentValueOnDisplay === null) {
        return;
      }

      if (
        firstNumber === null &&
        currentValueOnDisplay !== null &&
        previousOperator === null &&
        previousSecondNumber === null
      ) {
        setCalculatorData !== null &&
          setCalculatorData({
            ...calculatorData,
            equalButtonPress: true,
          });
        return;
      }

      if (
        firstNumber !== null &&
        currentValueOnDisplay !== null &&
        operator !== null
      ) {
        setCalculatorData !== null &&
          setCalculatorData({
            ...calculatorData,
            firstNumber: null,
            currentValueOnDisplay: countCalculationResult(
              firstNumber,
              currentValueOnDisplay,
              operator,
            ),
            previousSecondNumber: currentValueOnDisplay,
            previousOperator: operator,
            operator: null,
            equalButtonPress: true,
          });
      }

      if (
        firstNumber !== null &&
        operator !== null &&
        currentValueOnDisplay === null
      ) {
        setCalculatorData !== null &&
          setCalculatorData({
            ...calculatorData,
            currentValueOnDisplay: countCalculationResult(
              firstNumber,
              firstNumber,
              operator,
            ),
            firstNumber: null,
            previousSecondNumber: firstNumber,
            previousOperator: operator,
            operator: null,
            equalButtonPress: true,
          });
      }

      if (
        firstNumber !== null &&
        operator === null &&
        currentValueOnDisplay === null &&
        previousOperator !== null &&
        previousSecondNumber !== null
      ) {
        setCalculatorData !== null &&
          setCalculatorData({
            ...calculatorData,
            currentValueOnDisplay: countCalculationResult(
              firstNumber,
              previousSecondNumber,
              previousOperator,
            ),
            firstNumber: null,
            equalButtonPress: true,
          });
      }
    },
    [calculatorData, setCalculatorData],
  );

  return (
    <ShadowContainer isActive={shadow}>
      {id !== null ? (
        <SortableWrapper allClasses={allClasses} activeId={activeId} id={id}>
          <Button
            disabled={disabled}
            text={'='}
            width="full"
            height="large"
            colorButton="blue"
          />
        </SortableWrapper>
      ) : (
        <div className={allClasses}>
          <Button
            disabled={disabled}
            text={'='}
            width="full"
            height="large"
            colorButton="blue"
            onClick={() => {
              onClickEqualButton(
                currentValueOnDisplay,
                firstNumber,
                operator,
                previousOperator,
                previousSecondNumber,
              );
            }}
          />
        </div>
      )}
    </ShadowContainer>
  );
};

export default EqualButton;
