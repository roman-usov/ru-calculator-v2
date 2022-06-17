import Calculator from './logic/Calculator';

export default function init(element = document) {
  const primaryOperandElement = element.querySelector('.primary-operand');
  const secondaryOperandElement = element.querySelector('.secondary-operand');
  const operatorElement = element.querySelector('.operator');

  const calculator = new Calculator(
    primaryOperandElement,
    secondaryOperandElement,
    operatorElement
  );

  element.addEventListener('click', (e) => {
    if (e.target.matches('[data-all-clear]')) {
      calculator.clear();
    }
  });

  element.addEventListener('click', (e) => {
    if (e.target.matches('[data-delete]')) {
      calculator.delete();
    }
  });

  element.addEventListener('click', (e) => {
    if (e.target.matches('[data-number]')) {
      calculator.primaryOperand = e.target.textContent;
    }
  });

  return {
    calculator,
  };
}
