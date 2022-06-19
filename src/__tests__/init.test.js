import { document, calculator } from './testHelper';

/// ///// Event Listeners ////////

describe('Event Listeners', () => {
  describe('When AC is clicked', () => {
    test('clear() should be called and calculator values should be cleared', () => {
      calculator.clear();

      calculator.primaryOperand = '5';
      calculator.operator = '+';
      calculator.primaryOperand = '6';

      const acButton = document.querySelector('[data-all-clear]');
      // acButton.click();

      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      acButton.dispatchEvent(event);

      const primaryOperandElement = document.querySelector('.primary-operand');
      const secondaryOperandElement =
        document.querySelector('.secondary-operand');
      const operatorElement = document.querySelector('.operator');

      expect(primaryOperandElement.textContent).toBe('0');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('0');
      expect(secondaryOperandElement.textContent).toBe('');
      expect(secondaryOperandElement.dataset.secondaryOperand).toBe('');
      expect(operatorElement.textContent).toBe('');
      expect(operatorElement.dataset.operation).toBe('');
    });
  });

  describe('When DEL is clicked', () => {
    test('delete() should be called and last calculator value should be deleted', () => {
      calculator.clear();

      calculator.primaryOperand = '5';

      const delButton = document.querySelector('[data-delete]');
      // acButton.click();

      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      delButton.dispatchEvent(event);

      const primaryOperandElement = document.querySelector('.primary-operand');

      expect(primaryOperandElement.textContent).toBe('0');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('0');
    });
  });

  describe('When number is clicked', () => {
    test('set primaryOperand should be called', () => {
      calculator.clear();

      const numButton = document.querySelector('.five');
      // acButton.click();

      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      numButton.dispatchEvent(event);

      const primaryOperandElement = document.querySelector('.primary-operand');

      expect(primaryOperandElement.textContent).toBe('5');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('5');
    });
  });

  describe('When an operator is clicked', () => {
    test('set operator should be called and secondaryOperand and operator should be set', () => {
      calculator.clear();

      calculator.primaryOperand = '5';

      const operatorButton = document.querySelector('.plus');
      // acButton.click();

      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      operatorButton.dispatchEvent(event);

      const primaryOperandElement = document.querySelector('.primary-operand');
      const secondaryOperandElement =
        document.querySelector('.secondary-operand');
      const operatorElement = document.querySelector('.operator');

      expect(primaryOperandElement.textContent).toBe('0');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('0');
      expect(secondaryOperandElement.textContent).toBe('5');
      expect(secondaryOperandElement.dataset.secondaryOperand).toBe('5');
      expect(operatorElement.textContent).toBe('+');
      expect(operatorElement.dataset.operation).toBe('+');
    });
  });

  describe('When equal is clicked', () => {
    test('calculator.evaluate() should be called and result should be displayed', () => {
      calculator.clear();

      calculator.primaryOperand = '15';
      calculator.operator = '÷';
      calculator.primaryOperand = '3';

      const operatorButton = document.querySelector('[data-equals]');
      // acButton.click();

      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      operatorButton.dispatchEvent(event);

      const primaryOperandElement = document.querySelector('.primary-operand');
      const secondaryOperandElement =
        document.querySelector('.secondary-operand');
      const operatorElement = document.querySelector('.operator');

      expect(primaryOperandElement.textContent).toBe('5');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('5');
      expect(secondaryOperandElement.textContent).toBe('');
      expect(secondaryOperandElement.dataset.secondaryOperand).toBe('');
      expect(operatorElement.textContent).toBe('');
      expect(operatorElement.dataset.operation).toBe('');
    });
  });
});
