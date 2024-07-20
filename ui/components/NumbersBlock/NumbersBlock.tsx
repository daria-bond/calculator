import React, { type FC } from 'react';
import { type BlockType, type CalculationData } from '../../../pages/types';
import Button from '../../buttons/Button/Button';
import ShadowWrapper from '../../wrappers/ShadowWrapper/ShadowWrapper';
import SortableWrapper from '../../dndBlocks/SortableWrapper/SortableWrapper';
import { calculatorDataWithUndefinedValueOnDisplay } from '../../../helpers/consts';

interface NumbersBlockProps {
  calculatorData?: CalculationData;
  setCalculatorData?: (arg: CalculationData) => void;
  disabled: boolean;
  dndOpacity?: boolean;
  shadow?: boolean;
  activeBlockType?: BlockType;
  blockType?: BlockType;
}

const numbersAndComma = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];

const NumbersBlock: FC<NumbersBlockProps> = ({
  calculatorData = { ...calculatorDataWithUndefinedValueOnDisplay },
  setCalculatorData,
  disabled,
  dndOpacity = false,
  shadow = true,
  activeBlockType,
  blockType,
}) => {
  const { currentValueOnDisplay, equalButtonPress } = calculatorData;

  const allClasses = `grid grid-rows-4 grid-cols-3 gap-2 [&>*:nth-child(10)]:w-[152px] [&>*:nth-child(10)]:col-span-2 ${
    dndOpacity && 'opacity-40'
  }`;

  const onClickNumber = (lastValue: string, newSign: string): void => {
    if (!setCalculatorData) {
      return;
    }

    const patchData = (value: Partial<CalculationData>): void => {
      setCalculatorData({
        ...calculatorData,
        ...value,
      });
    };

    if (equalButtonPress) {
      patchData({
        currentValueOnDisplay: newSign === ',' ? '0,' : newSign,
        equalButtonPress: false,
      });
      return;
    }

    if (lastValue.toString().length >= 16) {
      return;
    }

    if (newSign === ',') {
      if (lastValue.includes(',')) {
        return;
      }

      if (lastValue === '0') {
        patchData({
          currentValueOnDisplay: '0,',
        });
        return;
      }
    }

    if (lastValue === '0') {
      patchData({
        currentValueOnDisplay: newSign,
      });
      return;
    }

    patchData({
      currentValueOnDisplay: lastValue.toString() + newSign.toString(),
    });
  };

  return (
    <ShadowWrapper isActive={shadow}>
      {blockType ? (
        <SortableWrapper
          allClasses={allClasses}
          activeBlockType={activeBlockType}
          blockType={blockType}
        >
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
              isCursorDefault={dndOpacity}
              key={sign}
              onClick={() => {
                onClickNumber(currentValueOnDisplay ?? '0', sign);
              }}
            />
          ))}
        </div>
      )}
    </ShadowWrapper>
  );
};

export default NumbersBlock;
