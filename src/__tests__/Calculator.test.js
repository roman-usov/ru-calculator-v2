import { document, calculator } from './testHelper';

/// ///// AC and DEL Controls ////////

describe('AC and DEL controls', () => {
  describe('AC control', () => {
    test('should clear primaryOperand, secondaryOperand and operator', () => {
      calculator.primaryOperand = '5';
      calculator.operator = '+';
      calculator.primaryOperand = '6';

      calculator.clear();

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

  describe('DEL for more than one character', () => {
    test('should delete last character', () => {
      calculator.clear();

      const primaryOperandElement = document.querySelector('.primary-operand');
      primaryOperandElement.textContent = '25';
      primaryOperandElement.dataset.primaryOperand = '25';

      calculator.delete();

      expect(primaryOperandElement.textContent).toBe('2');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('2');
    });
  });

  describe('DEL control for a single character', () => {
    test('should delete this single character and display zero', () => {
      calculator.clear();

      const primaryOperandElement = document.querySelector('.primary-operand');
      primaryOperandElement.textContent = '5';
      primaryOperandElement.dataset.primaryOperand = '5';

      calculator.delete();

      expect(primaryOperandElement.textContent).toBe('0');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('0');
    });
  });
});

/// ///// Handling . and , ////////

describe('Handling . and , characters', () => {
  describe('When primaryOperand is 678 and 9 is clicked', () => {
    test('primaryOperand in the UI should be 6,789 and primaryOperand dataset value should be 6789', () => {
      calculator.clear();

      calculator.primaryOperand = '6';
      calculator.primaryOperand = '7';
      calculator.primaryOperand = '8';
      calculator.primaryOperand = '9';

      const primaryOperandElement = document.querySelector('.primary-operand');

      expect(primaryOperandElement.textContent).toBe('6,789');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('6789');
    });
  });

  describe('When primaryOperand is 5. and + is clicked', () => {
    test('secondaryOperand should be 5', () => {
      calculator.clear();

      calculator.primaryOperand = '5.';

      calculator.operator = '+';

      const secondaryOperandElement =
        document.querySelector('.secondary-operand');

      expect(secondaryOperandElement.textContent).toBe('5');
      expect(secondaryOperandElement.dataset.secondaryOperand).toBe('5');
    });
  });

  describe('When primaryOperand is 5.5 and . is clicked', () => {
    test('primaryOperand should be 5.5', () => {
      calculator.clear();

      calculator.primaryOperand = '5.5';

      calculator.primaryOperand = '.';

      const primaryOperandElement = document.querySelector('.primary-operand');

      expect(primaryOperandElement.textContent).toBe('5.5');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('5.5');
    });
  });

  describe('When primaryOperand is -888 and 8 is clicked', () => {
    test('primaryOperand in the UI should be -8,888 and primaryOperand in the dataset should be -8888', () => {
      calculator.clear();

      calculator.primaryOperand = '-888';
      calculator.primaryOperand = '8';

      const primaryOperandElement = document.querySelector('.primary-operand');

      expect(primaryOperandElement.textContent).toBe('-8,888');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('-8888');
    });
  });

  describe('When primaryOperand is -88888 and DEL is clicked', () => {
    test('primaryOperand in the UI should be -8,888 and primaryOperand in the dataset should be -8888', () => {
      calculator.clear();

      calculator.primaryOperand = '-88888';

      calculator.delete();

      const primaryOperandElement = document.querySelector('.primary-operand');
      const secondaryOperandElement =
        document.querySelector('.secondary-operand');
      const operatorElement = document.querySelector('.operator');

      expect(primaryOperandElement.textContent).toBe('-8,888');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('-8888');
    });
  });

  describe('When 2638.05 is entered', () => {
    test('primaryOperand in the UI should be 2,638.05 and primaryOperand in the dataset should be 2638.05', () => {
      calculator.clear();

      calculator.primaryOperand = '2';
      calculator.primaryOperand = '6';
      calculator.primaryOperand = '3';
      calculator.primaryOperand = '8';
      calculator.primaryOperand = '.';
      calculator.primaryOperand = '0';
      calculator.primaryOperand = '5';

      const primaryOperandElement = document.querySelector('.primary-operand');
      const secondaryOperandElement =
        document.querySelector('.secondary-operand');
      const operatorElement = document.querySelector('.operator');

      expect(primaryOperandElement.textContent).toBe('2,638.05');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('2638.05');
    });
  });

  describe('When primaryOperand is 2638.05 and + is clicked', () => {
    test('secondaryOperand in the UI should be 2,638.05 and secondaryOperator in the dataset should be 2638.05 and the operator should be +', () => {
      calculator.clear();

      calculator.primaryOperand = '2638.05';
      calculator.operator = '+';

      const primaryOperandElement = document.querySelector('.primary-operand');
      const secondaryOperandElement =
        document.querySelector('.secondary-operand');
      const operatorElement = document.querySelector('.operator');

      expect(primaryOperandElement.textContent).toBe('0');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('0');
      expect(secondaryOperandElement.textContent).toBe('2,638.05');
      expect(secondaryOperandElement.dataset.secondaryOperand).toBe('2638.05');
      expect(operatorElement.textContent).toBe('+');
      expect(operatorElement.dataset.operation).toBe('+');
    });
  });
});

/// ///// Handling Round-offs ////////

describe('Handling round-offs', () => {
  describe('When 0.1 and 0.2 are added', () => {
    test('result should 0.3', () => {
      calculator.clear();

      const primaryOperandElement = document.querySelector('.primary-operand');

      const secondaryOperandElement =
        document.querySelector('.secondary-operand');

      const operatorElement = document.querySelector('.operator');

      calculator.primaryOperand = '0.1';
      calculator.operator = '+';
      calculator.primaryOperand = '0.2';

      calculator.evaluate();

      expect(primaryOperandElement.textContent).toBe('0.3');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('0.3');
      expect(secondaryOperandElement.textContent).toBe('');
      expect(secondaryOperandElement.dataset.secondaryOperand).toBe('');
      expect(operatorElement.textContent).toBe('');
      expect(operatorElement.dataset.operation).toBe('');
    });
  });

  describe('When 3 is divided by 9', () => {
    test('result should 0.3333333333', () => {
      calculator.clear();

      const primaryOperandElement = document.querySelector('.primary-operand');

      const secondaryOperandElement =
        document.querySelector('.secondary-operand');

      const operatorElement = document.querySelector('.operator');

      calculator.primaryOperand = '3';
      calculator.operator = '÷';
      calculator.primaryOperand = '9';

      calculator.evaluate();

      expect(primaryOperandElement.textContent).toBe('0.3333333333');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('0.3333333333');
      expect(secondaryOperandElement.textContent).toBe('');
      expect(secondaryOperandElement.dataset.secondaryOperand).toBe('');
      expect(operatorElement.textContent).toBe('');
      expect(operatorElement.dataset.operation).toBe('');
    });
  });
});

describe('Handling NaN and Infinity', () => {
  describe('When 0 is divided by 0', () => {
    test('result should NaN', () => {
      calculator.clear();

      const primaryOperandElement = document.querySelector('.primary-operand');

      calculator.primaryOperand = '0';
      calculator.operator = '÷';
      calculator.primaryOperand = '0';

      calculator.evaluate();

      expect(primaryOperandElement.textContent).toBe('NaN');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('NaN');
    });
  });

  describe('When 8 is divided by 0', () => {
    test('result should Infinity', () => {
      calculator.clear();

      const primaryOperandElement = document.querySelector('.primary-operand');

      calculator.primaryOperand = '8';
      calculator.operator = '÷';
      calculator.primaryOperand = '0';

      calculator.evaluate();

      expect(primaryOperandElement.textContent).toBe('∞');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('Infinity');
    });
  });

  describe('When operator is &', () => {
    test('result should NaN', () => {
      calculator.clear();

      const primaryOperandElement = document.querySelector('.primary-operand');

      calculator.primaryOperand = '6';
      calculator.operator = '&';
      calculator.primaryOperand = '3';

      calculator.evaluate();

      expect(primaryOperandElement.textContent).toBe('NaN');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('NaN');
    });
  });
});

/// ///// Basic Entries ////////

describe('Basic Entries', () => {
  describe('When primaryOperand is 0 and . is clicked', () => {
    test('primaryOperand should be 0.', () => {
      calculator.clear();

      const primaryOperandElement = document.querySelector('.primary-operand');

      calculator.primaryOperand = '.';

      expect(primaryOperandElement.textContent).toBe('0.');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('0.');
    });
  });

  describe('When primaryOperand is 0 and 2 is clicked', () => {
    test('primaryOperand should be 2', () => {
      calculator.clear();

      const primaryOperandElement = document.querySelector('.primary-operand');

      calculator.primaryOperand = '2';

      expect(primaryOperandElement.textContent).toBe('2');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('2');
    });
  });

  describe('When primaryOperand is 2 and . is clicked', () => {
    test('primaryOperand should be 2.', () => {
      calculator.clear();

      const primaryOperandElement = document.querySelector('.primary-operand');
      primaryOperandElement.textContent = '2';
      primaryOperandElement.dataset.primaryOperand = '2';

      calculator.primaryOperand = '.';

      expect(primaryOperandElement.textContent).toBe('2.');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('2.');
    });
  });

  describe('When primaryOperand is 5000 and - is clicked', () => {
    test('secondaryOperand should be 5000 and operator should be - and primaryOperand should be 0', () => {
      calculator.clear();

      calculator.primaryOperand = '5';
      calculator.primaryOperand = '0';
      calculator.primaryOperand = '0';
      calculator.primaryOperand = '0';

      calculator.operator = '-';

      const primaryOperandElement = document.querySelector('.primary-operand');
      const secondaryOperandElement =
        document.querySelector('.secondary-operand');
      const operatorElement = document.querySelector('.operator');

      expect(primaryOperandElement.textContent).toBe('0');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('0');
      expect(secondaryOperandElement.textContent).toBe('5,000');
      expect(secondaryOperandElement.dataset.secondaryOperand).toBe('5000');
      expect(operatorElement.textContent).toBe('-');
      expect(operatorElement.dataset.operation).toBe('-');
    });
  });

  describe('When operator is + and - is clicked ', () => {
    test('operator should be +', () => {
      calculator.clear();

      calculator.primaryOperand = '5';

      calculator.operator = '+';
      calculator.operator = '-';

      const operatorElement = document.querySelector('.operator');

      expect(operatorElement.textContent).toBe('+');
      expect(operatorElement.dataset.operation).toBe('+');
    });
  });

  describe('When primaryOperand is 0 and secondaryOperand and operator are empty and - is clicked', () => {
    test('primaryOperand should be 0 and secondaryOperand should be 0 and operator should be *', () => {
      calculator.clear();

      const primaryOperandElement = document.querySelector('.primary-operand');

      const secondaryOperandElement =
        document.querySelector('.secondary-operand');

      const operatorElement = document.querySelector('.operator');

      calculator.operator = '*';

      expect(primaryOperandElement.textContent).toBe('0');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('0');
      expect(secondaryOperandElement.textContent).toBe('0');
      expect(secondaryOperandElement.dataset.secondaryOperand).toBe('0');
      expect(operatorElement.textContent).toBe('*');
      expect(operatorElement.dataset.operation).toBe('*');
    });
  });
});

/// ///// Basic Math ////////

describe('Basic Math', () => {
  describe('When primaryOperand is 1000000 and secondaryOperand is 0 and operator is - and = is clicked', () => {
    test('result should be -1000000', () => {
      calculator.clear();

      const primaryOperandElement = document.querySelector('.primary-operand');

      const secondaryOperandElement =
        document.querySelector('.secondary-operand');

      const operatorElement = document.querySelector('.operator');

      calculator.primaryOperand = '0';
      calculator.operator = '-';
      calculator.primaryOperand = '1000000';

      calculator.evaluate();

      expect(primaryOperandElement.textContent).toBe('-1,000,000');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('-1000000');
      expect(secondaryOperandElement.textContent).toBe('');
      expect(secondaryOperandElement.dataset.secondaryOperand).toBe('');
      expect(operatorElement.textContent).toBe('');
      expect(operatorElement.dataset.operation).toBe('');
    });
  });

  describe('When primaryOperand is 9 and secondaryOperand is 3 and operator is + and = is clicked', () => {
    test('result should be 12', () => {
      calculator.clear();

      const primaryOperandElement = document.querySelector('.primary-operand');

      const secondaryOperandElement =
        document.querySelector('.secondary-operand');

      const operatorElement = document.querySelector('.operator');

      calculator.primaryOperand = '3';
      calculator.operator = '+';
      calculator.primaryOperand = '9';

      calculator.evaluate();

      expect(primaryOperandElement.textContent).toBe('12');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('12');
      expect(secondaryOperandElement.textContent).toBe('');
      expect(secondaryOperandElement.dataset.secondaryOperand).toBe('');
      expect(operatorElement.textContent).toBe('');
      expect(operatorElement.dataset.operation).toBe('');
    });
  });

  describe('When primaryOperand is 3 and secondaryOperand is 9 and operator is / and = is clicked', () => {
    test('result should be 3', () => {
      calculator.clear();

      const primaryOperandElement = document.querySelector('.primary-operand');

      const secondaryOperandElement =
        document.querySelector('.secondary-operand');

      const operatorElement = document.querySelector('.operator');

      calculator.primaryOperand = '9';
      calculator.operator = '÷';
      calculator.primaryOperand = '3';

      calculator.evaluate();

      expect(primaryOperandElement.textContent).toBe('3');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('3');
      expect(secondaryOperandElement.textContent).toBe('');
      expect(secondaryOperandElement.dataset.secondaryOperand).toBe('');
      expect(operatorElement.textContent).toBe('');
      expect(operatorElement.dataset.operation).toBe('');
    });
  });

  describe('When primaryOperand is 9 and secondaryOperand is 3 and operator is * and = is clicked', () => {
    test('result should be 27', () => {
      calculator.clear();

      const primaryOperandElement = document.querySelector('.primary-operand');

      const secondaryOperandElement =
        document.querySelector('.secondary-operand');

      const operatorElement = document.querySelector('.operator');

      calculator.primaryOperand = '3';
      calculator.operator = '*';
      calculator.primaryOperand = '9';

      calculator.evaluate();

      expect(primaryOperandElement.textContent).toBe('27');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('27');
      expect(secondaryOperandElement.textContent).toBe('');
      expect(secondaryOperandElement.dataset.secondaryOperand).toBe('');
      expect(operatorElement.textContent).toBe('');
      expect(operatorElement.dataset.operation).toBe('');
    });
  });
});
