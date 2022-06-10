import { CALCULATOR } from '../config/config';

// const calculatorEl = document.querySelector('.calculator-grid');

export default class ControlUI {
  calculatorEl = document.querySelector('.calculator-grid');

  primaryOperandEl = document.querySelector('.primary-operand');

  secondaryOperandEl = document.querySelector('.secondary-operand');

  operatorEl = document.querySelector('.operator');

  addHandlerCalculatorInput(handler) {
    this.calculatorEl.addEventListener('click', (e) => {
      const element = e.target;
      console.log(element);

      const isButton = element.matches('button');

      if (!isButton) return;

      const value = element.textContent;

      console.log('value', value);

      if (CALCULATOR.digits.includes(value)) {
        handler(value);
        this.setPrimaryOperand(value);
      }

      if (CALCULATOR.operators.includes(value)) {
        if (this.operatorEl.textContent !== '') return;
        this.setSecondaryOperand();
        this.setOperator(value);
        this.resetPrimaryOperand();
        handler(value);
      }

      if (value === CALCULATOR.delete) {
        if (this.primaryOperandEl.textContent.length > 1) {
          this.primaryOperandEl.textContent =
            this.primaryOperandEl.textContent.slice(0, -1);
          handler(value);
        } else {
          this.primaryOperandEl.textContent = '0';
          handler(value);
        }
      }

      if (value === CALCULATOR.clear) {
        this.clearOperands();
        handler(value);
      }
    });
  }

  setSecondaryOperand() {
    this.secondaryOperandEl.textContent =
      this.primaryOperandEl.textContent.slice(-1) === CALCULATOR.dot
        ? this.primaryOperandEl.textContent.slice(0, -1)
        : this.primaryOperandEl.textContent;
  }

  setOperator(value) {
    this.operatorEl.textContent = value;
  }

  resetPrimaryOperand() {
    this.primaryOperandEl.textContent = '0';
  }

  setPrimaryOperand(value) {
    const currentValue = this.primaryOperandEl.textContent;
    if (currentValue === '0' && value !== CALCULATOR.dot) {
      this.primaryOperandEl.textContent = value;
    } else if (
      (value === CALCULATOR.dot && !/\./g.test(currentValue)) ||
      value !== CALCULATOR.dot
    ) {
      this.primaryOperandEl.textContent += value;
    }
  }

  clearOperands() {
    this.primaryOperandEl.dataset.primaryOperand = '';
    this.primaryOperandEl.textContent = '0';
    this.secondaryOperandEl.dataset.secondaryOperand = '';
    this.secondaryOperandEl.textContent = '';
    this.operatorEl.textContent = '';
  }
}
