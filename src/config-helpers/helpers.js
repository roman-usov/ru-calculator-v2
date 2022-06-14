import CALCULATOR from './config';

export function formatNumber(number) {
  // console.log('input number for formatting', number);

  if (number === CALCULATOR.dot) {
    console.log('returned number because number is a dot', number);
    return number;
  }

  const numberToFormat = number.slice(0, 1) === '-' ? number.slice(1) : number;

  const minusPrefix = number.slice(0, 1) === '-' ? '-' : '';

  const [integerPart, decimalPart] = numberToFormat.split('.');

  if (/\D/g.test(integerPart) || integerPart.length <= 3) {
    // console.log(
    //   'no digits or part before dot <= 3',
    //   `${minusPrefix}${partBeforeDot}${partAfterDot}`
    // );
    return `${minusPrefix}${integerPart}${
      decimalPart != null ? '.' + decimalPart : ''
    }`;
  }

  const numberToFormatArr = integerPart.split('');

  let formattedNumber = '';

  while (numberToFormatArr.length > 3) {
    formattedNumber = `,${numberToFormatArr
      .splice(-3)
      .join('')}${formattedNumber}`;
  }

  // console.log(
  //   'formatted number',
  //   `${minusPrefix}${inputValue.join('')}${formattedNumber}${partAfterDot}`
  // );

  return `${minusPrefix}${numberToFormatArr.join('')}${formattedNumber}${
    decimalPart != null ? '.' + decimalPart : ''
  }`;
}

export function unformatNumber(number) {
  if (/,/g.test(number)) {
    return number.split(',').join('');
  }
  return number;
}
