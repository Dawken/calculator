import { actualResult } from './index';

let operation;

export const chooseOperation = (operator) => {
  if (actualResult !== '' || operator === '-' || operator === '(') {
    operation = operator;
    actualResult += operator;
  }
  if (actualResult === '') {

  }
};
