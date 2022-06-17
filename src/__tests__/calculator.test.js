import {
  document,
  calculator,
  controlUI,
  clearOperands,
  deleteCharacter,
  getOperatorInput,
  getNumberInput,
  performCalculation,
} from './testHelper';

/* Calculator Tests */

describe('AC and DEL controls', () => {
  describe('AC control', () => {
    test('should clear primaryOperand, secondaryOperand and operator', () => {
      calculator.reset();
      calculator.primaryOperand = '5.';
      calculator.secondaryOperand = '3';
      calculator.operator = '+';

      clearOperands();

      expect(calculator.primaryOperand).toBe('');
      expect(calculator.secondaryOperand).toBe('');
      expect(calculator.operator).toBe('');
    });
  });

  describe('DEL control', () => {
    test('should delete last character', () => {
      calculator.reset();
      calculator.primaryOperand = '23';

      deleteCharacter();

      expect(calculator.primaryOperand).toBe('2');
    });
  });

  describe('DEL control when single character is left', () => {
    test('should delete last character and display zero', () => {
      calculator.reset();
      calculator.primaryOperand = '2';

      deleteCharacter();

      expect(calculator.primaryOperand).toBe('0');
    });
  });
});

describe('Handling . and , characters', () => {
  describe('When primaryOperand is 5. and + is clicked', () => {
    test('secondaryOperand should be 5', () => {
      calculator.reset();
      calculator.primaryOperand = '5.';
      calculator.secondaryOperand = '';
      calculator.operator = '';

      getOperatorInput('+');

      expect(calculator.primaryOperand).toBe('');
      expect(calculator.secondaryOperand).toBe('5');
      expect(calculator.operator).toBe('+');
    });
  });

  describe('When primaryOperand is 0 and . is clicked', () => {
    test('primaryOperand should be 0.', () => {
      calculator.reset();
      calculator.primaryOperand = '0';

      getNumberInput('.');

      expect(calculator.primaryOperand).toBe('0.');
    });
  });

  describe('When primaryOperand is 5.5 and . is clicked', () => {
    test('primaryOperand should be 5.5', () => {
      calculator.reset();
      calculator.primaryOperand = '5.5';

      getNumberInput('.');

      expect(calculator.primaryOperand).toBe('5.5');
    });
  });

  describe('When primaryOperand is 888 and 8 is clicked', () => {
    test('primaryOperand should be 8888', () => {
      calculator.reset();
      calculator.primaryOperand = '888';

      getNumberInput('8');

      expect(calculator.primaryOperand).toBe('8888');
    });
  });

  describe('When primaryOperand is -888 and 8 is clicked', () => {
    test('primaryOperand should be -8888', () => {
      calculator.reset();
      calculator.primaryOperand = '-888';

      getNumberInput('8');

      expect(calculator.primaryOperand).toBe('-8888');
    });
  });

  describe('When primaryOperand is 8888 and + is clicked', () => {
    test('secondaryOperand should be 8888, operator should be +', () => {
      calculator.reset();
      calculator.primaryOperand = '8888';

      getOperatorInput('+');

      expect(calculator.primaryOperand).toBe('');
      expect(calculator.secondaryOperand).toBe('8888');
      expect(calculator.operator).toBe('+');
    });
  });

  describe('When primaryOperand is -8888 and DEL is clicked', () => {
    test('primaryOperand should be -888', () => {
      calculator.reset();
      calculator.primaryOperand = '-8888';

      deleteCharacter();

      expect(calculator.primaryOperand).toBe('-888');
    });
  });

  describe('When 2638.05 is entered', () => {
    test('primaryOperand should be 2638.05', () => {
      calculator.reset();

      getNumberInput('2');
      getNumberInput('6');
      getNumberInput('3');
      getNumberInput('8');
      getNumberInput('.');
      getNumberInput('0');
      getNumberInput('5');

      expect(calculator.primaryOperand).toBe('2638.05');
    });
  });

  describe('When primaryOperand is 2638.05 and + is clicked', () => {
    test('secondaryOperand should be 2638.05 and operator should be +', () => {
      calculator.reset();

      calculator.primaryOperand = '2638.05';

      getOperatorInput('+');

      expect(calculator.primaryOperand).toBe('');
      expect(calculator.secondaryOperand).toBe('2638.05');
      expect(calculator.operator).toBe('+');
    });
  });
});

describe('Handling round-offs', () => {
  describe('When 0.1 and 0.2 are added', () => {
    test('result should 0.3', () => {
      calculator.reset();
      calculator.primaryOperand = '0.1';
      calculator.secondaryOperand = '0.2';
      calculator.operator = '+';

      performCalculation();

      expect(calculator.primaryOperand).toBe('0.3');
    });
  });

  describe('When 3 is divided by 9', () => {
    test('result should 0.3333333333', () => {
      calculator.reset();
      calculator.primaryOperand = '9';
      calculator.secondaryOperand = '3';
      calculator.operator = '÷';

      performCalculation();

      expect(calculator.primaryOperand).toBe('0.3333333333');
    });
  });
});

describe('Handling NaN and Infinity', () => {
  describe('When 0 is divided by 0', () => {
    test('result should NaN', () => {
      calculator.reset();
      calculator.primaryOperand = '0';
      calculator.secondaryOperand = '0';
      calculator.operator = '÷';

      performCalculation();

      expect(calculator.primaryOperand).toBe('NaN');
    });
  });

  describe('When 8 is divided by 0', () => {
    test('result should Infinity', () => {
      calculator.reset();
      calculator.primaryOperand = '0';
      calculator.secondaryOperand = '8';
      calculator.operator = '÷';

      performCalculation();

      expect(calculator.primaryOperand).toBe('Infinity');
    });
  });

  describe('When operator is &', () => {
    test('result should NaN', () => {
      calculator.reset();
      calculator.primaryOperand = '1';
      calculator.secondaryOperand = '2';
      calculator.operator = '&';

      performCalculation();

      expect(calculator.primaryOperand).toBe('NaN');
    });
  });
});

describe('Basic Entries', () => {
  describe('When primaryOperand is 0 and - is clicked', () => {
    test('secondaryOperand should be 0 and operator should be -', () => {
      calculator.reset();
      calculator.primaryOperand = '0';
      calculator.secondaryOperand = '';
      calculator.operator = '';

      getOperatorInput('-');

      expect(calculator.primaryOperand).toBe('');
      expect(calculator.secondaryOperand).toBe('0');
      expect(calculator.operator).toBe('-');
    });
  });

  describe('When primaryOperand and secondaryOperand are 0 and - is clicked', () => {
    test('primaryOperand should be 0 and secondaryOperand and operator should be empty', () => {
      calculator.reset();
      calculator.primaryOperand = '0';
      calculator.secondaryOperand = '0';
      calculator.operator = '-';

      performCalculation();

      expect(calculator.primaryOperand).toBe('0');
      expect(calculator.secondaryOperand).toBe('');
      expect(calculator.operator).toBe('');
    });
  });

  describe('When primaryOperand is empty and secondaryOperand is . ', () => {
    test('primaryOperand should be 0', () => {
      calculator.reset();
      calculator.primaryOperand = '';

      getNumberInput('.');

      expect(calculator.primaryOperand).toBe('0.');
    });
  });

  describe('When operator is + and - is clicked ', () => {
    test('operator should be +', () => {
      calculator.reset();
      calculator.operator = '+';

      getOperatorInput('-');

      expect(calculator.operator).toBe('+');
    });
  });
});

describe('Basic Math', () => {
  describe('When primaryOperand is 1000000 and secondaryOperand is 0 and operator is - and = is clicked', () => {
    test('result should be -1000000', () => {
      calculator.reset();
      calculator.primaryOperand = '1000000';
      calculator.secondaryOperand = '0';
      calculator.operator = '-';

      performCalculation();

      expect(calculator.primaryOperand).toBe('-1000000');
      expect(calculator.secondaryOperand).toBe('');
      expect(calculator.operator).toBe('');
    });
  });

  describe('When primaryOperand is 9 and secondaryOperand is 3 and operator is + and = is clicked', () => {
    test('result should be 12', () => {
      calculator.reset();
      calculator.primaryOperand = '9';
      calculator.secondaryOperand = '3';
      calculator.operator = '+';

      performCalculation();

      expect(calculator.primaryOperand).toBe('12');
      expect(calculator.secondaryOperand).toBe('');
      expect(calculator.operator).toBe('');
    });
  });

  describe('When primaryOperand is 9 and secondaryOperand is 3 and operator is - and = is clicked', () => {
    test('result should be 12', () => {
      calculator.reset();
      calculator.primaryOperand = '9';
      calculator.secondaryOperand = '3';
      calculator.operator = '-';

      performCalculation();

      expect(calculator.primaryOperand).toBe('-6');
      expect(calculator.secondaryOperand).toBe('');
      expect(calculator.operator).toBe('');
    });
  });

  describe('When primaryOperand is 9 and secondaryOperand is 3 and operator is * and = is clicked', () => {
    test('result should be 27', () => {
      calculator.reset();
      calculator.primaryOperand = '9';
      calculator.secondaryOperand = '3';
      calculator.operator = '*';

      performCalculation();

      expect(calculator.primaryOperand).toBe('27');
      expect(calculator.secondaryOperand).toBe('');
      expect(calculator.operator).toBe('');
    });
  });
});

/* UI Tests */

describe('UI AC and DEL controls', () => {
  describe('AC control', () => {
    test('clears primaryOperand, secondaryOperand and operator', () => {
      controlUI.setPrimaryOperand('5');
      controlUI.setSecondaryOperand('3');
      controlUI.setOperator('+');

      controlUI.clearOperands();

      expect(document.querySelector('.primary-operand').textContent).toBe('0');
      expect(document.querySelector('.secondary-operand').textContent).toBe('');
      expect(document.querySelector('.operator').textContent).toBe('');
    });
  });

  describe('DEL last character in double-digit number', () => {
    test('should delete last character in primaryOperandEl', () => {
      controlUI.clearOperands();

      controlUI.setPrimaryOperand('23');

      controlUI.deleteCharacter();

      expect(document.querySelector('.primary-operand').textContent).toBe('2');
    });
  });

  describe('DEL last character in single-digit number', () => {
    test('should delete last character in primaryOperandEl and make it 0', () => {
      controlUI.clearOperands();

      controlUI.setPrimaryOperand('2');

      controlUI.deleteCharacter();

      expect(document.querySelector('.primary-operand').textContent).toBe('0');
    });
  });
});

describe('UI Handling . and , characters', () => {
  describe('primaryOperand displays 5. and + is clicked', () => {
    test('secondaryOperand should display 5, operator should display +, primaryOperand should display 0', () => {
      controlUI.clearOperands();
      controlUI.setPrimaryOperand('5.');

      controlUI.setOperator('+');

      expect(document.querySelector('.primary-operand').textContent).toBe('0');
      expect(document.querySelector('.secondary-operand').textContent).toBe(
        '5'
      );
      expect(document.querySelector('.operator').textContent).toBe('+');
    });
  });

  describe('primaryOperand is 0 and . is clicked', () => {
    test('primaryOperand should display 0.', () => {
      controlUI.clearOperands();

      controlUI.setPrimaryOperand('.');

      expect(document.querySelector('.primary-operand').textContent).toBe('0.');
    });
  });

  describe('primaryOperand is 5.5 and . is clicked', () => {
    test('primaryOperand should display 5.5', () => {
      controlUI.clearOperands();

      controlUI.setPrimaryOperand('5.5');

      controlUI.setPrimaryOperand('.');

      expect(document.querySelector('.primary-operand').textContent).toBe(
        '5.5'
      );
    });
  });

  describe('primaryOperand is 888 and 8 is clicked', () => {
    test('primaryOperand should display 8,888', () => {
      controlUI.clearOperands();

      controlUI.setPrimaryOperand('888');

      controlUI.setPrimaryOperand('8');

      expect(document.querySelector('.primary-operand').textContent).toBe(
        '8,888'
      );
    });
  });

  describe('primaryOperand is -888 and 8 is clicked', () => {
    test('primaryOperand should display -8,888', () => {
      controlUI.clearOperands();

      controlUI.setPrimaryOperand('-888');

      controlUI.setPrimaryOperand('8');

      expect(document.querySelector('.primary-operand').textContent).toBe(
        '-8,888'
      );
    });
  });

  describe('primaryOperand displays 8,888 and + is clicked', () => {
    test('secondaryOperand should display 8,888, operator should display +, primaryOperand should display 0', () => {
      controlUI.clearOperands();

      controlUI.setPrimaryOperand('8,888');

      controlUI.setOperator('+');

      expect(document.querySelector('.primary-operand').textContent).toBe('0');
      expect(document.querySelector('.secondary-operand').textContent).toBe(
        '8,888'
      );
      expect(document.querySelector('.operator').textContent).toBe('+');
    });
  });

  describe('primaryOperand displays -8,888 and + is clicked', () => {
    test('secondaryOperand should display -8,888, operator should display +, primaryOperand should display 0', () => {
      controlUI.clearOperands();

      controlUI.setPrimaryOperand('-8,888');

      controlUI.setOperator('+');

      expect(document.querySelector('.primary-operand').textContent).toBe('0');
      expect(document.querySelector('.secondary-operand').textContent).toBe(
        '-8,888'
      );
      expect(document.querySelector('.operator').textContent).toBe('+');
    });
  });

  describe('primaryOperand is -8,888 and DEL is clicked', () => {
    test('primaryOperand should display -888', () => {
      controlUI.clearOperands();

      controlUI.setPrimaryOperand('-8,888');

      controlUI.deleteCharacter();

      expect(document.querySelector('.primary-operand').textContent).toBe(
        '-888'
      );
    });
  });

  describe('When primaryOperand receives 1000', () => {
    test('primaryOperand should display 1,000', () => {
      controlUI.clearOperands();

      controlUI.setPrimaryOperand('1');
      controlUI.setPrimaryOperand('0');
      controlUI.setPrimaryOperand('0');
      controlUI.setPrimaryOperand('0');

      expect(document.querySelector('.primary-operand').textContent).toBe(
        '1,000'
      );
    });
  });

  describe('When primaryOperand receives 123000', () => {
    test('primaryOperand should display 123,000', () => {
      controlUI.clearOperands();

      controlUI.setPrimaryOperand('1');
      controlUI.setPrimaryOperand('2');
      controlUI.setPrimaryOperand('3');
      controlUI.setPrimaryOperand('0');
      controlUI.setPrimaryOperand('0');
      controlUI.setPrimaryOperand('0');

      expect(document.querySelector('.primary-operand').textContent).toBe(
        '123,000'
      );
    });
  });

  describe('When primaryOperand receives 2638.05', () => {
    test('primaryOperand should display 2,638.05', () => {
      controlUI.clearOperands();

      controlUI.setPrimaryOperand('2');
      controlUI.setPrimaryOperand('6');
      controlUI.setPrimaryOperand('3');
      controlUI.setPrimaryOperand('8');
      controlUI.setPrimaryOperand('.');
      controlUI.setPrimaryOperand('0');
      controlUI.setPrimaryOperand('5');

      expect(document.querySelector('.primary-operand').textContent).toBe(
        '2,638.05'
      );
    });
  });

  describe('primaryOperand displays 2,638.05 and + is clicked', () => {
    test('secondaryOperand should display 2,638.05, operator should display +, primaryOperand should display 0', () => {
      controlUI.clearOperands();

      controlUI.setPrimaryOperand('2,638.05');

      controlUI.setOperator('+');

      expect(document.querySelector('.primary-operand').textContent).toBe('0');
      expect(document.querySelector('.secondary-operand').textContent).toBe(
        '2,638.05'
      );
      expect(document.querySelector('.operator').textContent).toBe('+');
    });
  });
});

describe('UI Handling round-offs', () => {
  describe('When 0.1 and 0.2 are added', () => {
    test('result should be 0.3', () => {
      calculator.reset();
      calculator.primaryOperand = '0.1';
      calculator.secondaryOperand = '0.2';
      calculator.operator = '+';

      performCalculation();

      expect(document.querySelector('.primary-operand').textContent).toBe(
        '0.3'
      );
      expect(document.querySelector('.secondary-operand').textContent).toBe('');
      expect(document.querySelector('.operator').textContent).toBe('');
    });
  });

  describe('UI Handling round-offs', () => {
    describe('When 3 is divided by 9', () => {
      test('result should be 0.3333333333', () => {
        calculator.reset();
        calculator.primaryOperand = '9';
        calculator.secondaryOperand = '3';
        calculator.operator = '÷';

        performCalculation();

        expect(document.querySelector('.primary-operand').textContent).toBe(
          '0.3333333333'
        );
        expect(document.querySelector('.secondary-operand').textContent).toBe(
          ''
        );
        expect(document.querySelector('.operator').textContent).toBe('');
      });
    });
  });
});

describe('UI Handling NaN and Infinity', () => {
  describe('When 0 is divided by 0', () => {
    test('result should be NaN', () => {
      calculator.reset();
      calculator.primaryOperand = '0';
      calculator.secondaryOperand = '0';
      calculator.operator = '÷';

      performCalculation();

      expect(document.querySelector('.primary-operand').textContent).toBe(
        'NaN'
      );
      expect(document.querySelector('.secondary-operand').textContent).toBe('');
      expect(document.querySelector('.operator').textContent).toBe('');
    });
  });

  describe('When 8 is divided by 0', () => {
    test('result should be Infinity', () => {
      calculator.reset();
      calculator.primaryOperand = '0';
      calculator.secondaryOperand = '8';
      calculator.operator = '÷';

      performCalculation();

      expect(document.querySelector('.primary-operand').textContent).toBe(
        'Infinity'
      );
      expect(document.querySelector('.secondary-operand').textContent).toBe('');
      expect(document.querySelector('.operator').textContent).toBe('');
    });
  });
});

describe('UI Basic Entries', () => {
  describe('When primaryOperand is 0 and - is clicked', () => {
    test('primaryOperand is 0, secondaryOperand is 0, operator is -', () => {
      controlUI.clearOperands();

      controlUI.setPrimaryOperand('0');

      controlUI.setOperator('-');

      expect(document.querySelector('.primary-operand').textContent).toBe('0');
      expect(document.querySelector('.secondary-operand').textContent).toBe(
        '0'
      );
      expect(document.querySelector('.operator').textContent).toBe('-');
    });
  });

  describe('When primaryOperand is 5 and . is clicked', () => {
    test('primaryOperand is 5.', () => {
      controlUI.clearOperands();

      controlUI.setPrimaryOperand('5');

      controlUI.setOperator('.');

      expect(document.querySelector('.primary-operand').textContent).toBe('5.');
    });
  });
});

describe('UI Basic Math', () => {
  describe('When primaryOperand is 1,000,000, secondaryOperand is 0 and operator is -, and = is clicked', () => {
    test('primaryOperand is 0, secondaryOperand is 0, operator is -', () => {
      calculator.reset();
      calculator.primaryOperand = '1000000';
      calculator.secondaryOperand = '0';
      calculator.operator = '-';

      performCalculation();

      expect(document.querySelector('.primary-operand').textContent).toBe(
        '-1,000,000'
      );
      expect(document.querySelector('.secondary-operand').textContent).toBe('');
      expect(document.querySelector('.operator').textContent).toBe('');
    });
  });

  describe('When primaryOperand is 9, secondaryOperand is 3 and operator is *, and = is clicked', () => {
    test('primaryOperand is 0, secondaryOperand is 0, operator is -', () => {
      calculator.reset();
      calculator.primaryOperand = '9';
      calculator.secondaryOperand = '3';
      calculator.operator = '*';

      performCalculation();

      expect(document.querySelector('.primary-operand').textContent).toBe('27');
      expect(document.querySelector('.secondary-operand').textContent).toBe('');
      expect(document.querySelector('.operator').textContent).toBe('');
    });
  });
});
