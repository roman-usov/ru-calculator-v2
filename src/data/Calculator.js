import { CALCULATOR } from '../config/config.js';

export default class Calculator {
  #primaryOperand;

  #secondaryOperand;

  #operator;

  constructor() {
    this.#primaryOperand = '0';
    this.#secondaryOperand = '';
    this.#operator = '';
  }

  reset() {
    this.#primaryOperand = '0';
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

  set primaryOperand(value) {
    if (this.#primaryOperand === '0') {
      this.#primaryOperand = value;
    } else if (value === '0') {
      this.#primaryOperand = value;
    } else {
      this.#primaryOperand += value;
    }
  }

  get primaryOperand() {
    return this.#primaryOperand;
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

  get secondaryOperand() {
    return this.#secondaryOperand;
  }

  set operator(value) {
    if (this.#operator !== '') return;
    this.#operator = value;
  }

  get operator() {
    return this.#operator;
  }
}
