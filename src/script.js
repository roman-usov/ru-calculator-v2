import Calculator from './data/Calculator';
import ControlUI from './view/ControlUI';
import { CALCULATOR } from './config/config';
import SolveMath from './calculations/SolveMath';

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
    // calculator.resetPrimaryOperand();
    calculator.primaryOperand = data;
    console.log(calculator);
  }

  if (data === CALCULATOR.delete) {
    calculator.delete();
    console.log(calculator);
  }

  if (data === CALCULATOR.equal) {
    const result = SolveMath.calculate(
      +calculator.primaryOperand,
      calculator.operator,
      +calculator.secondaryOperand
    ).toString();
    console.log(result);
    calculator.reset();
    calculator.primaryOperand = result;
    console.log(calculator);
    controlUI.clearOperands();
    controlUI.setPrimaryOperand(result);
  }
}

function init() {
  controlUI.addHandlerCalculatorInput(getInput);
}

init();
