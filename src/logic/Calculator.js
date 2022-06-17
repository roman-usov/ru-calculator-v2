import { add, divide, multiply, subtract } from 'mathjs';
import CALCULATOR from '../config-helpers/config';

export default class Calculator {
  #primaryOperandElement;

  #secondaryOperandElement;

  #operatorElement;

  constructor(primaryOperandElement, secondaryOperandElement, operatorElement) {
    this.#primaryOperandElement = primaryOperandElement;
    this.#secondaryOperandElement = secondaryOperandElement;
    this.#operatorElement = operatorElement;
  }

  formatNumber(stringNum) {
    if (stringNum === '.') return stringNum;

    const [integerPart, decimalPart] = stringNum.split('.');

    if (integerPart.length <= 3) return stringNum;

    return `${new Intl.NumberFormat('en-US').format(integerPart)}${
      decimalPart == null ? '' : `.${decimalPart}`
    }`;
  }

  get primaryOperand() {
    return this.#primaryOperandElement.dataset.primaryOperand;
  }

  set primaryOperand(value) {
    if (value === '.' && this.primaryOperand === '') {
      this.#primaryOperandElement.textContent += value;
      this.#primaryOperandElement.dataset.primaryOperand = `0${value}`;
      return;
    }

    if (this.primaryOperand === '') {
      this.#primaryOperandElement.textContent = value;
      this.#primaryOperandElement.dataset.primaryOperand = value;
      return;
    }

    this.#primaryOperandElement.dataset.primaryOperand += value;

    this.#primaryOperandElement.textContent = this.formatNumber(
      this.primaryOperand
    );
  }

  clear() {
    this.#primaryOperandElement.textContent = '0';
    this.#primaryOperandElement.dataset.primaryOperand = '';

    this.#secondaryOperandElement.textContent = '';
    this.#secondaryOperandElement.dataset.secondaryOperand = '';

    this.#operatorElement.textContent = '';
    this.#operatorElement.dataset.operation = '';
  }

  delete() {
    const currentValue = this.#primaryOperandElement.dataset.primaryOperand;
    const newValue = currentValue.slice(0, -1);

    this.#primaryOperandElement.textContent = newValue === '' ? '0' : newValue;
    this.#primaryOperandElement.dataset.primaryOperand = newValue;
  }

  evaluate(firstOperand, operator, secondOperand) {
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
