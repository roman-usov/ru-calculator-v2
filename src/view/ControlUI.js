import CALCULATOR from '../config-helpers/config';
import { formatNumber, unformatNumber } from '../config-helpers/helpers';

export default class ControlUI {
  constructor(element = document) {
    this.numberEls = element.querySelectorAll('[data-number]');
    this.operatorEls = element.querySelectorAll('[data-operator]');
    this.operatorEl = element.querySelector('.operator');
    this.primaryOperandEl = element.querySelector('.primary-operand');
    this.secondaryOperandEl = element.querySelector('.secondary-operand');
    this.equalEl = element.querySelector('[data-equals]');
    this.clearEl = element.querySelector('[data-all-clear]');
    this.deleteEl = element.querySelector('[data-delete]');
  }

  addHandlerForNumberInput(handler) {
    this.numberEls.forEach((numberEl) => {
      numberEl.addEventListener('click', (e) => {
        const element = e.target;

        const isNumberEl = element.matches('[data-number]');

        if (!isNumberEl) return;

        const value = element.textContent;

        if (CALCULATOR.digits.includes(value)) {
          handler(value);

          this.setPrimaryOperand(value);
        }
      });
    });
  }

  addHandlerForOperatorInput(handler) {
    this.operatorEls.forEach((operatorEl) => {
      operatorEl.addEventListener('click', (e) => {
        const element = e.target;
        const isOperatorEl = element.matches('[data-operator]');

        if (!isOperatorEl) return;

        const value = element.textContent;

        if (CALCULATOR.operators.includes(value)) {
          this.setOperator(value);

          handler(value);
        }
      });
    });
  }

  addHandlerForEqual(handler) {
    this.equalEl.addEventListener('click', (e) => {
      const element = e.target;

      const isEqualEl = element.matches('[data-equals]');

      if (!isEqualEl) return;

      const value = element.textContent;

      if (this.secondaryOperandEl.textContent && this.operatorEl.textContent) {
        handler(value);
      }
    });
  }

  addHandlerForClearInput(handler) {
    this.clearEl.addEventListener('click', (e) => {
      const element = e.target;

      const isClearEl = element.matches('[data-all-clear]');

      if (!isClearEl) return;

      const value = element.textContent;

      this.clearOperands();
      handler(value);
    });
  }

  addHandlerForDeleteInput(handler) {
    this.deleteEl.addEventListener('click', (e) => {
      const element = e.target;

      const isDeleteEl = element.matches('[data-delete]');

      if (!isDeleteEl) return;

      this.deleteCharacter();

      handler();
    });
  }

  deleteCharacter() {
    if (this.primaryOperandEl.textContent.length > 1) {
      const newValue = unformatNumber(
        this.primaryOperandEl.textContent.slice(0, -1)
      );

      this.primaryOperandEl.textContent = formatNumber(newValue);
    } else {
      this.primaryOperandEl.textContent = '0';
    }
  }

  setPrimaryOperand(value) {
    const currentValue = this.primaryOperandEl.textContent;

    if (CALCULATOR.operators.includes(value)) {
      this.primaryOperandEl.textContent = '0';
    } else if (currentValue === '0' && value !== CALCULATOR.dot) {
      this.primaryOperandEl.textContent = formatNumber(value);
    } else if (
      (value === CALCULATOR.dot && !/\./g.test(currentValue)) ||
      value !== CALCULATOR.dot
    ) {
      const newValue =
        unformatNumber(this.primaryOperandEl.textContent) + value;

      this.primaryOperandEl.textContent = formatNumber(newValue);
    }
  }

  setSecondaryOperand() {
    this.secondaryOperandEl.textContent =
      this.primaryOperandEl.textContent.slice(-1) === CALCULATOR.dot
        ? this.primaryOperandEl.textContent.slice(0, -1)
        : this.primaryOperandEl.textContent;
  }

  setOperator(value) {
    if (this.operatorEl.textContent !== '') return;

    this.operatorEl.textContent = value;

    this.setSecondaryOperand();

    this.setPrimaryOperand(value);
  }

  clearOperands() {
    this.primaryOperandEl.textContent = '0';

    this.secondaryOperandEl.textContent = '';

    this.operatorEl.textContent = '';
  }
}
