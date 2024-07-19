import { type CalculationData } from '../pages/types';

export const initCalculatorData: CalculationData = {
  firstNumber: undefined,
  secondNumber: undefined,
  operator: undefined,
  equalButtonPress: false,
  previousOperator: undefined,
  previousSecondNumber: undefined,
  currentValueOnDisplay: '0', // this is string because we need save ','
};

export const calculatorDataWithUndefinedValueOnDisplay: CalculationData = {
  firstNumber: undefined,
  secondNumber: undefined,
  operator: undefined,
  equalButtonPress: false,
  previousOperator: undefined,
  previousSecondNumber: undefined,
  currentValueOnDisplay: undefined,
};
