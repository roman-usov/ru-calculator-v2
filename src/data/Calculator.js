import { CALCULATOR } from '../config/config';

export default class Calculator {
  #primaryOperand;

  #secondaryOperand;

  #operator;

  constructor() {
    this.#primaryOperand = '';
    this.#secondaryOperand = '';
    this.#operator = '';
  }

  reset() {
    this.#primaryOperand = '';
    this.#secondaryOperand = '';
    this.#operator = '';
  }

  delete() {
    if (this.#primaryOperand.length > 1) {
      this.#primaryOperand = this.#primaryOperand.slice(0, -1);
    } else {
      this.#primaryOperand = '0';
    }
  }

  get primaryOperand() {
    return this.#primaryOperand;
  }

  set primaryOperand(value) {
    if (value === CALCULATOR.dot && /\./g.test(this.#primaryOperand)) return;

    if (this.#primaryOperand === '') {
      this.#primaryOperand = value;
    } else {
      this.#primaryOperand += value;
    }
  }

  resetPrimaryOperand() {
    this.#primaryOperand = '';
  }

  get secondaryOperand() {
    return this.#secondaryOperand;
  }

  set secondaryOperand(value) {
    const cleanValue =
      value.slice(-1) === CALCULATOR.dot ? value.slice(0, -1) : value;

    if (this.#secondaryOperand === '') {
      this.#secondaryOperand = cleanValue;
    } else {
      this.#secondaryOperand += cleanValue;
    }
  }

  resetSecondaryOperand() {
    this.#secondaryOperand = '';
  }

  get operator() {
    return this.#operator;
  }

  set operator(value) {
    if (this.#operator !== '') return;
    this.#operator = value;
  }

  resetOperator() {
    this.#operator = '';
  }
}
