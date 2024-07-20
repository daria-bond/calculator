import React, { useCallback, type FC } from 'react';
import { countCalculationResult } from '../../../helpers/countCalculationResult';
import { type BlockType, type CalculationData, type Operator } from '../../../pages/types';
import Button from '../../buttons/Button/Button';
import ShadowWrapper from '../../wrappers/ShadowWrapper/ShadowWrapper';
import SortableWrapper from '../../dndBlocks/SortableWrapper/SortableWrapper';
import { calculatorDataWithUndefinedValueOnDisplay } from '../../../helpers/consts';
import { numberToString, stringToNumber } from '../../../helpers/functions';

interface EqualButtonProps {
  calculatorData?: CalculationData;
  setCalculatorData?: (ICalculationDataState) => void;
  disabled: boolean;
  dndOpacity?: boolean;
  shadow?: boolean;
  activeBlockType?: BlockType;
  blockType?: BlockType;
}

const EqualButton: FC<EqualButtonProps> = ({
  calculatorData = { ...calculatorDataWithUndefinedValueOnDisplay },
  setCalculatorData,
  disabled,
  dndOpacity = false,
  shadow = true,
  activeBlockType,
  blockType,
}) => {
  const { firstNumber, operator, previousOperator, previousSecondNumber, currentValueOnDisplay } =
    calculatorData;

  const allClasses = `${dndOpacity ? 'opacity-40 w-[232px]' : 'w-[232px]'}`;

  const onClickEqualButton = useCallback(
    (
      currentValueOnDisplay: string | undefined,
      firstNumber: number | undefined,
      operator: Operator | undefined,
      previousOperator: Operator | undefined,
      previousSecondNumber: number | undefined,
    ) => {
      if (!setCalculatorData) {
        return;
      }

      if (firstNumber === undefined && currentValueOnDisplay === undefined) {
        return;
      }

      const patchData = (value: Partial<CalculationData>): void => {
        setCalculatorData({
          ...calculatorData,
          ...value,
        });
      };

      if (
        firstNumber === undefined && // repeat prev operation
        currentValueOnDisplay !== undefined &&
        previousOperator !== undefined &&
        previousSecondNumber !== undefined
      ) {
        patchData({
          currentValueOnDisplay: numberToString(
            countCalculationResult(
              stringToNumber(currentValueOnDisplay),
              previousSecondNumber,
              previousOperator,
            ),
          ),
          equalButtonPress: true,
        });
        return;
      }

      if (
        firstNumber === undefined && //  equalButtonPress: true
        currentValueOnDisplay !== undefined &&
        previousOperator === undefined &&
        previousSecondNumber === undefined
      ) {
        patchData({
          equalButtonPress: true,
        });
        return;
      }

      if (
        firstNumber !== undefined && // simple calculation
        currentValueOnDisplay !== undefined &&
        operator !== undefined
      ) {
        patchData({
          firstNumber: undefined,
          currentValueOnDisplay: numberToString(
            countCalculationResult(firstNumber, stringToNumber(currentValueOnDisplay), operator),
          ),
          previousSecondNumber: stringToNumber(currentValueOnDisplay),
          previousOperator: operator,
          operator: undefined,
          equalButtonPress: true,
        });
        return;
      }

      if (
        firstNumber !== undefined && // calculation with single number
        operator !== undefined &&
        currentValueOnDisplay === undefined
      ) {
        patchData({
          currentValueOnDisplay: numberToString(
            countCalculationResult(firstNumber, firstNumber, operator),
          ),
          firstNumber: undefined,
          previousSecondNumber: firstNumber,
          previousOperator: operator,
          operator: undefined,
          equalButtonPress: true,
        });
        return;
      }

      if (
        firstNumber !== undefined && // error's situation
        operator === undefined &&
        currentValueOnDisplay === undefined &&
        previousOperator !== undefined &&
        previousSecondNumber !== undefined
      ) {
        patchData({
          currentValueOnDisplay: numberToString(
            countCalculationResult(firstNumber, previousSecondNumber, previousOperator),
          ),
          firstNumber: undefined,
          equalButtonPress: true,
        });
      }
    },
    [calculatorData, setCalculatorData],
  );

  return (
    <ShadowWrapper isActive={shadow}>
      {blockType ? (
        <SortableWrapper
          allClasses={allClasses}
          activeBlockType={activeBlockType}
          blockType={blockType}
        >
          <Button disabled={disabled} text={'='} width="full" height="large" colorButton="blue" />
        </SortableWrapper>
      ) : (
        <div className={allClasses}>
          <Button
            disabled={disabled}
            text={'='}
            width="full"
            height="large"
            colorButton="blue"
            isCursorDefault={dndOpacity}
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
    </ShadowWrapper>
  );
};

export default EqualButton;
