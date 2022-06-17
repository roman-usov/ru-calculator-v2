import { document, calculator } from './testHelper';

/* Calculator Tests */

describe('AC and DEL controls', () => {
  describe('AC control', () => {
    test('should clear primaryOperand, secondaryOperand and operator', () => {
      calculator.primaryOperand = '5';
      calculator.secondaryOperand = '6';
      calculator.operator = '+';

      calculator.clear();

      const primaryOperandElement = document.querySelector('.primary-operand');
      const secondaryOperandElement =
        document.querySelector('.secondary-operand');
      const operatorElement = document.querySelector('.operator');

      expect(primaryOperandElement.textContent).toBe('0');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('');
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
      expect(primaryOperandElement.dataset.primaryOperand).toBe('');
    });
  });
});

describe('Handling . and , characters', () => {
  describe('When primaryOperand is 678 and 9 is clicked', () => {
    test('primaryOperand in the UI should be 6,789 and primaryOperand dataset value should be 6789', () => {
      calculator.primaryOperand = '6';
      calculator.primaryOperand = '7';
      calculator.primaryOperand = '8';
      calculator.primaryOperand = '9';

      const primaryOperandElement = document.querySelector('.primary-operand');

      expect(primaryOperandElement.textContent).toBe('6,789');
      expect(primaryOperandElement.dataset.primaryOperand).toBe('6789');
    });
  });
  //   describe('When primaryOperand is -888 and 8 is clicked', () => {
  //     test('primaryOperand should be -8888', () => {});
  //   });
  //   describe('When primaryOperand is 5. and + is clicked', () => {
  //     test('secondaryOperand should be 5', () => {});
  //   });
  //
  //   describe('When primaryOperand is 5.5 and . is clicked', () => {
  //     test('primaryOperand should be 5.5', () => {});
  //   });
  //
  //
  //
  //   describe('When primaryOperand is 8888 and + is clicked', () => {
  //     test('secondaryOperand should be 8888, operator should be +', () => {});
  //   });
  //
  //   describe('When primaryOperand is -8888 and DEL is clicked', () => {
  //     test('primaryOperand should be -888', () => {});
  //   });
  //
  //   describe('When 2638.05 is entered', () => {
  //     test('primaryOperand should be 2638.05', () => {});
  //   });
  //
  //   describe('When primaryOperand is 2638.05 and + is clicked', () => {
  //     test('secondaryOperand should be 2638.05 and operator should be +', () => {});
  //   });
});

// describe('Handling round-offs', () => {
//   describe('When 0.1 and 0.2 are added', () => {
//     test('result should 0.3', () => {});
//   });
//
//   describe('When 3 is divided by 9', () => {
//     test('result should 0.3333333333', () => {});
//   });
// });
//
// describe('Handling NaN and Infinity', () => {
//   describe('When 0 is divided by 0', () => {
//     test('result should NaN', () => {});
//   });
//
//   describe('When 8 is divided by 0', () => {
//     test('result should Infinity', () => {});
//   });
//
//   describe('When operator is &', () => {
//     test('result should NaN', () => {});
//   });
// });
//
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

  //   describe('When primaryOperand is 0 and - is clicked', () => {
  //     test('secondaryOperand should be 0 and operator should be -', () => {});
  //   });
  //
  //   describe('When primaryOperand and secondaryOperand are 0 and - is clicked', () => {
  //     test('primaryOperand should be 0 and secondaryOperand and operator should be empty', () => {});
  //   });
  //
  //   describe('When primaryOperand is empty and secondaryOperand is . ', () => {
  //     test('primaryOperand should be 0', () => {});
  //   });
  //
  //   describe('When operator is + and - is clicked ', () => {
  //     test('operator should be +', () => {});
  //   });
});

// describe('Basic Math', () => {
//   describe('When primaryOperand is 1000000 and secondaryOperand is 0 and operator is - and = is clicked', () => {
//     test('result should be -1000000', () => {});
//   });
//
//   describe('When primaryOperand is 9 and secondaryOperand is 3 and operator is + and = is clicked', () => {
//     test('result should be 12', () => {});
//   });
//
//   describe('When primaryOperand is 9 and secondaryOperand is 3 and operator is - and = is clicked', () => {
//     test('result should be 12', () => {});
//   });
//
//   describe('When primaryOperand is 9 and secondaryOperand is 3 and operator is * and = is clicked', () => {
//     test('result should be 27', () => {});
//   });
// });
//
// /* UI Tests */
//
// describe('UI AC and DEL controls', () => {
//   describe('AC control', () => {
//     test('clears primaryOperand, secondaryOperand and operator', () => {});
//   });
//
//   describe('DEL last character in double-digit number', () => {
//     test('should delete last character in primaryOperandEl', () => {});
//   });
//
//   describe('DEL last character in single-digit number', () => {
//     test('should delete last character in primaryOperandEl and make it 0', () => {});
//   });
// });
//
// describe('UI Handling . and , characters', () => {
//   describe('primaryOperand displays 5. and + is clicked', () => {
//     test('secondaryOperand should display 5, operator should display +, primaryOperand should display 0', () => {});
//   });
//
//   describe('primaryOperand is 0 and . is clicked', () => {
//     test('primaryOperand should display 0.', () => {});
//   });
//
//   describe('primaryOperand is 5.5 and . is clicked', () => {
//     test('primaryOperand should display 5.5', () => {});
//   });
//
//   describe('primaryOperand is 888 and 8 is clicked', () => {
//     test('primaryOperand should display 8,888', () => {});
//   });
//
//   describe('primaryOperand is -888 and 8 is clicked', () => {
//     test('primaryOperand should display -8,888', () => {});
//   });
//
//   describe('primaryOperand displays 8,888 and + is clicked', () => {
//     test('secondaryOperand should display 8,888, operator should display +, primaryOperand should display 0', () => {});
//   });
//
//   describe('primaryOperand displays -8,888 and + is clicked', () => {
//     test('secondaryOperand should display -8,888, operator should display +, primaryOperand should display 0', () => {});
//   });
//
//   describe('primaryOperand is -8,888 and DEL is clicked', () => {
//     test('primaryOperand should display -888', () => {});
//   });
//
//   describe('When primaryOperand receives 1000', () => {
//     test('primaryOperand should display 1,000', () => {});
//   });
//
//   describe('When primaryOperand receives 123000', () => {
//     test('primaryOperand should display 123,000', () => {});
//   });
//
//   describe('When primaryOperand receives 2638.05', () => {
//     test('primaryOperand should display 2,638.05', () => {});
//   });
//
//   describe('primaryOperand displays 2,638.05 and + is clicked', () => {
//     test('secondaryOperand should display 2,638.05, operator should display +, primaryOperand should display 0', () => {});
//   });
// });
//
// describe('UI Handling round-offs', () => {
//   describe('When 0.1 and 0.2 are added', () => {
//     test('result should be 0.3', () => {});
//   });
//
//   describe('UI Handling round-offs', () => {
//     describe('When 3 is divided by 9', () => {
//       test('result should be 0.3333333333', () => {});
//     });
//   });
// });
//
// describe('UI Handling NaN and Infinity', () => {
//   describe('When 0 is divided by 0', () => {
//     test('result should be NaN', () => {});
//   });
//
//   describe('When 8 is divided by 0', () => {
//     test('result should be Infinity', () => {});
//   });
// });
//
// describe('UI Basic Entries', () => {
//   describe('When primaryOperand is 0 and - is clicked', () => {
//     test('primaryOperand is 0, secondaryOperand is 0, operator is -', () => {});
//   });
//
//   describe('When primaryOperand is 5 and . is clicked', () => {
//     test('primaryOperand is 5.', () => {});
//   });
// });
//
// describe('UI Basic Math', () => {
//   describe('When primaryOperand is 1,000,000, secondaryOperand is 0 and operator is -, and = is clicked', () => {
//     test('primaryOperand is 0, secondaryOperand is 0, operator is -', () => {});
//   });
//
//   describe('When primaryOperand is 9, secondaryOperand is 3 and operator is *, and = is clicked', () => {
//     test('primaryOperand is 0, secondaryOperand is 0, operator is -', () => {});
//   });
// });
