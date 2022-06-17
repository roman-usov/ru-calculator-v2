import { add, multiply, divide, subtract, format } from 'mathjs';
import CALCULATOR from '../config-helpers/config';

export default class SolveMath {
  static calculate(firstOperand, operator, secondOperand) {
    let result;
    switch (operator) {
      case CALCULATOR.add:
        result = add(secondOperand, firstOperand);
        break;
      case CALCULATOR.subtract:
        result = subtract(secondOperand, firstOperand);
        break;
      case CALCULATOR.multiply:
        result = multiply(secondOperand, firstOperand);
        break;
      case CALCULATOR.divide:
        result = divide(secondOperand, firstOperand);
        break;
      default:
        result = NaN;
    }

    return parseFloat(result.toFixed(10));
  }
}
