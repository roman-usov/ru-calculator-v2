import { Window } from 'happy-dom';
import { init } from '../init';

// import { htmlStr } from './DOM';
import Calculator from '../data/Calculator';

const window = new Window();
const { document } = window;

document.body.innerHTML = `
      <div class="calculator-grid">
        <div class="output">
          <div class="history">
            <div data-secondary-operand class="secondary-operand"></div>
            <div data-operation class="operator"></div>
          </div>
          <div data-primary-operand class="primary-operand">0</div>
        </div>
        <button data-all-clear class="span-two">AC</button>
        <button data-delete>DEL</button>
        <button data-operation data-operator>÷</button>
        <button data-number>1</button>
        <button data-number>2</button>
        <button data-number>3</button>
        <button data-operation data-operator>*</button>
        <button data-number>4</button>
        <button data-number>5</button>
        <button data-number>6</button>
        <button data-operation data-operator>+</button>
        <button data-number>7</button>
        <button data-number>8</button>
        <button data-number>9</button>
        <button data-operation data-operator>-</button>
        <button data-number>.</button>
        <button data-number>0</button>
        <button data-equals class="span-two">=</button>
      </div>
`;

const { calculator, controlUI, clearOperands } = init(document);

describe('AC and DEL controls', () => {
  describe('AC control', () => {
    test('clears primaryOperand, secondaryOperand and operator', () => {
      calculator.primaryOperand = '5';
      calculator.secondaryOperand = '3';
      calculator.operator = '+';

      clearOperands();

      expect(calculator.primaryOperand).toBe('');
      expect(calculator.secondaryOperand).toBe('');
      expect(calculator.operator).toBe('');
    });
  });
});

/* Calculator Tests */

/* UI Tests */

describe('UI AC and DEL controls', () => {
  describe('AC control', () => {
    test('clears primaryOperand, secondaryOperand and operator', () => {
      controlUI.setPrimaryOperand('5');
      controlUI.setSecondaryOperand('3');
      controlUI.setOperator('+');

      controlUI.clearOperands();

      console.log(document.querySelector('.secondary-operand').textContent);

      expect(document.querySelector('.primary-operand').textContent).toBe('0');
      expect(document.querySelector('.secondary-operand').textContent).toBe('');
      expect(document.querySelector('.operator').textContent).toBe('');
    });
  });
});
