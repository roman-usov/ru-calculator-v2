import CALCULATOR from '../config-helpers/config';
import { formatNumber, unformatNumber } from '../config-helpers/helpers';

export default class ControlUI {
  numberEls = document.querySelectorAll('[data-number]');

  operatorEls = document.querySelectorAll('[data-operator]');

  operatorEl = document.querySelector('.operator');

  primaryOperandEl = document.querySelector('.primary-operand');

  secondaryOperandEl = document.querySelector('.secondary-operand');

  equalEl = document.querySelector('[data-equals]');

  clearEl = document.querySelector('[data-all-clear]');

  deleteEl = document.querySelector('[data-delete]');

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
          if (this.operatorEl.textContent !== '') return;
          this.setSecondaryOperand();
          this.setOperator(value);
          // this.resetPrimaryOperand();
          this.setPrimaryOperand(value);
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

      const value = element.textContent;

      if (this.primaryOperandEl.textContent.length > 1) {
        const newValue = unformatNumber(
          this.primaryOperandEl.textContent.slice(0, -1)
        );
        this.primaryOperandEl.textContent = formatNumber(newValue);
        handler(value);
      } else {
        this.primaryOperandEl.textContent = '0';
        handler(value);
      }
    });
  }

  setPrimaryOperand(value) {
    console.log('value to set', value);
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
    this.operatorEl.textContent = value;
  }

  clearOperands() {
    this.primaryOperandEl.textContent = '0';
    this.secondaryOperandEl.textContent = '';
    this.operatorEl.textContent = '';
  }
}

/*
export default class ControlUI {
  calculatorEl = document.querySelector('.calculator-grid');

  primaryOperandEl = document.querySelector('.primary-operand');

  secondaryOperandEl = document.querySelector('.secondary-operand');

  operatorEl = document.querySelector('.operator');

  addHandlerForNumberInput(handler) {}

  addHandlerForOperatorInput(handler) {}

  addHandlerForClearInput(handler) {}

  addHandlerForDeleteInput(handler) {}

  addHandlerForEqual;

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

      if (
        value === CALCULATOR.equal &&
        this.secondaryOperandEl.textContent &&
        this.operatorEl.textContent
      ) {
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

  setPrimaryOperand(value) {
    console.log('value to set', value);
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

  resetPrimaryOperand() {
    this.primaryOperandEl.textContent = '0';
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

  clearOperands() {
    this.primaryOperandEl.textContent = '0';
    this.secondaryOperandEl.textContent = '';
    this.operatorEl.textContent = '';
  }
} */
