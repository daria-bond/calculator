import React, { type FC, useMemo } from 'react';
import { type BlockType, type CalculationData } from '../../../pages/types';
import ArithmeticSignsBlock from '../../components/ArithmeticSignsBlock/ArithmeticSignsBlock';
import Display from '../../components/Display/Display';
import NumbersBlock from '../../components/NumbersBlock/NumbersBlock';
import EqualButton from '../../components/EqualButton/EqualButton';

type CalculatorBlockWrapperProps = {
  blockType: BlockType;
} & (
  | {
      // standard and disabled status
      disabledStatus: boolean; // status
      withDoubleClickStatus?: false;
      calculatorData: CalculationData;
      setCalculatorData: (value: CalculationData) => void;
      isConstructorMode: boolean;
    }
  | {
      // with double click status
      withDoubleClickStatus: true;
      activeBlockType: BlockType | undefined;
    }
);

const CalculatorBlockWrapper: FC<CalculatorBlockWrapperProps> = props => {
  const { blockType } = props;

  const sharedProps = useMemo(() => {
    return {
      disabled: props.withDoubleClickStatus ? true : props.isConstructorMode,
      calculatorData: props.withDoubleClickStatus ? undefined : props.calculatorData,
      dndOpacity: !props.withDoubleClickStatus && props.disabledStatus ? true : undefined,
      shadow: !(props.withDoubleClickStatus || props.disabledStatus),
      blockType: props.withDoubleClickStatus ? blockType : undefined,
      activeBlockType: props.withDoubleClickStatus ? props.activeBlockType : undefined,
    };
  }, [props]);

  const sharedSetProps = useMemo(() => {
    return {
      setCalculatorData: props.withDoubleClickStatus ? undefined : props.setCalculatorData,
    };
  }, [props]);

  switch (blockType) {
    case 'display':
      return <Display {...sharedProps} />;

    case 'arithmeticSignsBlock':
      return <ArithmeticSignsBlock {...sharedSetProps} {...sharedProps} />;

    case 'numbersBlock':
      return <NumbersBlock {...sharedSetProps} {...sharedProps} />;

    case 'equalButton':
      return <EqualButton {...sharedSetProps} {...sharedProps} />;
  }
};

export default CalculatorBlockWrapper;
