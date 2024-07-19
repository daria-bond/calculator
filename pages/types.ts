export interface CalculationData {
  firstNumber?: number;
  secondNumber?: number;
  operator?: Operator;
  equalButtonPress: boolean;
  previousOperator?: Operator;
  previousSecondNumber?: number;
  currentValueOnDisplay?: string;
}

export type Operator = 'addition' | 'multiplication' | 'subtraction' | 'division';

export interface CalculatorItem {
  parent: boolean;
  blockType: BlockType;
}

export type BlockType = 'display' | 'arithmeticSignsBlock' | 'numbersBlock' | 'equalButton';
