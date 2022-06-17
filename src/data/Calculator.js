import CALCULATOR from '../config-helpers/config';

export default class Calculator {
  #primaryOperand = '';

  #secondaryOperand = '';

  #operator = '';

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

    if (value === CALCULATOR.dot && this.#primaryOperand === '0') {
      this.#primaryOperand += value;

      return;
    }

    if (CALCULATOR.operators.includes(value)) {
      this.#primaryOperand = '';

      return;
    }

    if (this.primaryOperand === '' && value === CALCULATOR.dot) {
      this.#primaryOperand = `0${value}`;
    } else if (this.#primaryOperand === '' || this.#primaryOperand === '0') {
      this.#primaryOperand = value;
    } else {
      this.#primaryOperand += value;
    }
  }

  get secondaryOperand() {
    return this.#secondaryOperand;
  }

  set secondaryOperand(value) {
    const cleanValue =
      value.slice(-1) === CALCULATOR.dot ? value.slice(0, -1) : value;

    this.#secondaryOperand = cleanValue;
  }

  get operator() {
    return this.#operator;
  }

  set operator(value) {
    if (this.#operator !== '') return;
    this.#operator = value;
  }
}
