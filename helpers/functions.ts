export const stringToNumber = (str: string): number => {
  return Number(str.replace(',', '.'));
};

export const numberToString = (number: number): string => {
  return number.toString().replace('.', ',');
};
