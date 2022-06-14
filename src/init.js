import Calculator from './data/Calculator';
import ControlUI from './view/ControlUI';
import CALCULATOR from './config-helpers/config';
import SolveMath from './calculations/SolveMath';

export function init(element) {
  const calculator = new Calculator();
  const controlUI = new ControlUI(element);

  function getNumberInput(data) {
    calculator.primaryOperand = data;
    console.log('getNumberInput', calculator);
  }

  function getOperatorInput(data) {
    calculator.operator = CALCULATOR.operators.find(
      (operator) => operator === data
    );
    console.log('getOperatorInput, operator', calculator);

    calculator.secondaryOperand = calculator.primaryOperand;
    console.log('getOperatorInput, secondaryOperand', calculator);

    calculator.primaryOperand = data;
    console.log('getOperatorInput, primaryOperand', calculator);
  }

  function performCalculation() {
    const result = SolveMath.calculate(
      +calculator.primaryOperand,
      calculator.operator,
      +calculator.secondaryOperand
    ).toString();

    console.log('stringified result:', result);

    calculator.reset();

    calculator.primaryOperand = result;

    console.log(calculator);

    controlUI.clearOperands();

    controlUI.setPrimaryOperand(result);
  }

  function clearOperands() {
    calculator.reset();
    console.log('reset', calculator);
  }

  function deleteCharacter() {
    calculator.delete();
    console.log('delete', calculator);
  }

  controlUI.addHandlerForNumberInput(getNumberInput);

  controlUI.addHandlerForOperatorInput(getOperatorInput);

  controlUI.addHandlerForEqual(performCalculation);

  controlUI.addHandlerForClearInput(clearOperands);

  controlUI.addHandlerForDeleteInput(deleteCharacter);

  return {
    calculator,
    controlUI,
    clearOperands,
  };
}
