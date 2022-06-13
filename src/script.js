import Calculator from './data/Calculator';
import ControlUI from './view/ControlUI';
import CALCULATOR from './config-helpers/config';
import SolveMath from './calculations/SolveMath';
import { formatNumber } from './config-helpers/helpers';

const calculator = new Calculator();
const controlUI = new ControlUI();

function getNumberInput(data) {
  calculator.primaryOperand = data;
  console.log(calculator);
}

function getOperatorInput(data) {
  calculator.operator = CALCULATOR.operators.find(
    (operator) => operator === data
  );
  calculator.secondaryOperand = calculator.primaryOperand;
  // calculator.resetPrimaryOperand();
  calculator.primaryOperand = data;
  console.log(calculator);
}

function performCalculation() {
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

function clearOperands() {
  calculator.reset();
  console.log('calculator after clear', calculator);
}

function deleteCharacter() {
  calculator.delete();
  console.log(calculator);
}

function init() {
  controlUI.addHandlerForNumberInput(getNumberInput);
  controlUI.addHandlerForOperatorInput(getOperatorInput);
  controlUI.addHandlerForEqual(performCalculation);
  controlUI.addHandlerForClearInput(clearOperands);
  controlUI.addHandlerForDeleteInput(deleteCharacter);
}

init();

console.log(formatNumber('12000000'));
console.log(formatNumber('1200000008809805'));
console.log(formatNumber('0.588'));
console.log(formatNumber('222'));
console.log(formatNumber('2222'));
console.log(formatNumber('0'));
