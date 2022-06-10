import Calculator from './data/Calculator';
import ControlUI from './view/ControlUI';
import { CALCULATOR } from './config/config';

export const calculator = new Calculator();
const controlUI = new ControlUI();

function getInput(data) {
  if (CALCULATOR.digits.includes(data)) {
    calculator.primaryOperand = data;
    console.log(calculator);
  }

  if (data === CALCULATOR.clear) {
    calculator.reset();
    console.log('calculator after clear', calculator);
  }

  if (CALCULATOR.operators.includes(data)) {
    calculator.operator = CALCULATOR.operators.find(
      (operator) => operator === data
    );
    calculator.secondaryOperand = calculator.primaryOperand;
    calculator.primaryOperand = '0';
    console.log(calculator);
  }

  if (data === CALCULATOR.delete) {
    calculator.delete();
    console.log(calculator);
  }
}

function init() {
  controlUI.addHandlerCalculatorInput(getInput);
}

init();
