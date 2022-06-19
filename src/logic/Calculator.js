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
    if (value === '.' && this.primaryOperand === '0') {
      this.#primaryOperandElement.textContent += value;
      this.#primaryOperandElement.dataset.primaryOperand += value;
      return;
    }

    if (value === '.' && /\./g.test(this.primaryOperand)) return;

    if (this.primaryOperand === '0') {
      this.#primaryOperandElement.textContent = this.formatNumber(value);
      this.#primaryOperandElement.dataset.primaryOperand = value;
      return;
    }

    this.#primaryOperandElement.dataset.primaryOperand += value;

    this.#primaryOperandElement.textContent = this.formatNumber(
      this.primaryOperand
    );
  }

  get secondaryOperand() {
    return this.#secondaryOperandElement.dataset.secondaryOperand;
  }

  get operator() {
    return this.#operatorElement.dataset.operation;
  }

  set operator(value) {
    if (this.operator !== '') return;

    this.#operatorElement.textContent = value;
    this.#operatorElement.dataset.operation = value;

    this.#secondaryOperandElement.textContent =
      this.primaryOperand.slice(-1) === '.'
        ? this.formatNumber(this.primaryOperand.slice(0, -1))
        : this.formatNumber(this.primaryOperand);

    this.#secondaryOperandElement.dataset.secondaryOperand =
      this.primaryOperand.slice(-1) === '.'
        ? this.primaryOperand.slice(0, -1)
        : this.primaryOperand;

    this.#primaryOperandElement.textContent = '0';
    this.#primaryOperandElement.dataset.primaryOperand = '0';
  }

  clear() {
    this.#primaryOperandElement.textContent = '0';
    this.#primaryOperandElement.dataset.primaryOperand = '0';

    this.#secondaryOperandElement.textContent = '';
    this.#secondaryOperandElement.dataset.secondaryOperand = '';

    this.#operatorElement.textContent = '';
    this.#operatorElement.dataset.operation = '';
  }

  delete() {
    const currentValue = this.#primaryOperandElement.dataset.primaryOperand;
    const newValue = currentValue.slice(0, -1);

    this.#primaryOperandElement.textContent =
      newValue === '' ? '0' : this.formatNumber(newValue);
    this.#primaryOperandElement.dataset.primaryOperand =
      newValue === '' ? '0' : newValue;
  }

  evaluate() {
    let result;

    switch (this.operator) {
      case CALCULATOR.add:
        result = add(this.secondaryOperand, this.primaryOperand);
        break;
      case CALCULATOR.subtract:
        result = subtract(this.secondaryOperand, this.primaryOperand);
        break;
      case CALCULATOR.multiply:
        result = multiply(this.secondaryOperand, this.primaryOperand);
        break;
      case CALCULATOR.divide:
        result = divide(this.secondaryOperand, this.primaryOperand);
        break;
      default:
        result = NaN;
    }

    result = parseFloat(result.toFixed(10));

    this.clear();

    this.primaryOperand = result.toString();
  }
}
