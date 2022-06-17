import CALCULATOR from './config';

export function formatNumber(number) {
  // console.log('input number for formatting', number);

  const numberToFormat = number.slice(0, 1) === '-' ? number.slice(1) : number;

  const minusPrefix = number.slice(0, 1) === '-' ? '-' : '';

  const [integerPart, decimalPart] = numberToFormat.split('.');

  if (/\D/g.test(integerPart) || integerPart.length <= 3) {
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
