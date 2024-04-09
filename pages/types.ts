export interface ICalculationData {
  firstNumber: number | null;
  secondNumber: number | null;
  operator: Operator;
  equalButtonPress: boolean;
  previousOperator: Operator;
  previousSecondNumber: number | null;
  currentValueOnDisplay: number | null;
}

export type Operator =
  | 'addition'
  | 'multiplication'
  | 'subtraction'
  | 'division'
  | null;

export interface ICalculatorItem {
  parent: '' | 'A';
  id: IdWithoutNull;
}

export type IdWithNull =
  | 'display'
  | 'arithmeticSignsBlock'
  | 'numbersBlock'
  | 'equalButton'
  | null;

export type IdWithoutNull =
  | 'display'
  | 'arithmeticSignsBlock'
  | 'numbersBlock'
  | 'equalButton';
