import React from 'react';
import { type ICalculationData, type IdWithNull } from '../pages/types';
import ArithmeticSignsBlock from '../ui/ArithmeticSignsBlock/ArithmeticSignsBlock';
import Display from '../ui/Display/Display';
import EqualButton from '../ui/EqualButton/EqualButton';
import NumbersBlock from '../ui/NumbersBlock/NumbersBlock';

export const renderCalculatorBlock = (
  id: IdWithNull,
  status: 'standard' | 'disabled' | 'withDoubleClick',
  activeId: IdWithNull,
  mode: boolean,
  calculatorData: ICalculationData,
  setCalculatorData: (value: ICalculationData) => void,
  prefixForKey: string,
): JSX.Element | null => {
  switch (id + '-' + status) {
    // Display
    case 'display-standard':
      return (
        <Display
          calculatorData={calculatorData}
          disabled={mode}
          key={`${prefixForKey}-${id}-standard`}
        />
      );
    case 'display-disabled':
      return (
        <Display
          calculatorData={calculatorData}
          disabled={mode}
          key={`${prefixForKey}-${id}-disabled`}
          dndOpacity={true}
          shadow={false}
        />
      );
    case 'display-withDoubleClick':
      return (
        <Display
          id={id}
          activeId={activeId}
          disabled={mode}
          key={`${prefixForKey}-${id}-withDoubleClick`}
          shadow={false}
        />
      );

    // ArithmeticSignsBlock
    case 'arithmeticSignsBlock-standard':
      return (
        <ArithmeticSignsBlock
          disabled={mode}
          calculatorData={calculatorData}
          setCalculatorData={setCalculatorData}
          key={`${prefixForKey}-${id}-standard`}
        />
      );
    case 'arithmeticSignsBlock-disabled':
      return (
        <ArithmeticSignsBlock
          disabled={mode}
          calculatorData={calculatorData}
          setCalculatorData={setCalculatorData}
          key={`${prefixForKey}-${id}-disabled`}
          dndOpacity={true}
          shadow={false}
        />
      );
    case 'arithmeticSignsBlock-withDoubleClick':
      return (
        <ArithmeticSignsBlock
          id={id}
          activeId={activeId}
          disabled={true}
          shadow={false}
          key={`${prefixForKey}-${id}-withDoubleClick`}
        />
      );

    // NumbersBlock
    case 'numbersBlock-standard':
      return (
        <NumbersBlock
          disabled={mode}
          calculatorData={calculatorData}
          setCalculatorData={setCalculatorData}
          key={`${prefixForKey}-${id}-standard`}
        />
      );
    case 'numbersBlock-disabled':
      return (
        <NumbersBlock
          disabled={mode}
          calculatorData={calculatorData}
          setCalculatorData={setCalculatorData}
          key={`${prefixForKey}-${id}-disabled`}
          dndOpacity={true}
          shadow={false}
        />
      );
    case 'numbersBlock-withDoubleClick':
      return (
        <NumbersBlock
          id={id}
          activeId={activeId}
          disabled={true}
          shadow={false}
          key={`${prefixForKey}-${id}-withDoubleClick`}
        />
      );

    // EqualButton
    case 'equalButton-standard':
      return (
        <EqualButton
          disabled={mode}
          setCalculatorData={setCalculatorData}
          calculatorData={calculatorData}
          key={`${prefixForKey}-${id}-standard`}
        />
      );
    case 'equalButton-disabled':
      return (
        <EqualButton
          disabled={mode}
          setCalculatorData={setCalculatorData}
          calculatorData={calculatorData}
          key={`${prefixForKey}-${id}-disabled`}
          dndOpacity={true}
          shadow={false}
        />
      );
    case 'equalButton-withDoubleClick':
      return (
        <EqualButton
          id={id}
          activeId={activeId}
          disabled={true}
          shadow={false}
          key={`${prefixForKey}-${id}-withDoubleClick`}
        />
      );
    default:
      return null;
  }
};
