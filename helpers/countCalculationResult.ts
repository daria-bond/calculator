import { type Operator } from '../pages/types';

export const countCalculationResult = (
  firstNumber: number,
  secondNumber: number,
  operator: Operator,
): number => {
  switch (operator) {
    case 'addition':
      return firstNumber + secondNumber;
    case 'multiplication':
      return firstNumber * secondNumber;
    case 'subtraction':
      return firstNumber - secondNumber;
    case 'division':
      return firstNumber / secondNumber;
    default:
      return 11111111111111;
  }
};
