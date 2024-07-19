import { type Operator } from '../pages/types';

export const countCalculationResult = (
  firstNumber: number,
  secondNumber: number,
  operator: Operator,
): number => {
  switch (operator) {
    case 'addition':
      return resultLength(firstNumber + secondNumber);
    case 'multiplication':
      return resultLength(firstNumber * secondNumber);
    case 'subtraction':
      return resultLength(firstNumber - secondNumber);
    case 'division':
      return resultLength(firstNumber / secondNumber);
  }
};

const resultLength = (num: number): number => {
  return Number(num.toString().slice(0, 16));
};
