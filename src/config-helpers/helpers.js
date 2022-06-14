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

  // if (number.slice(0, 1) === '-') {
  //   minusPrefix = '-';
  //   const absoluteNumber = number.slice(1);
  //   partBeforeDot = absoluteNumber.split('.')[0];
  //   partAfterDot =
  //     absoluteNumber.split('.')[1] != null
  //       ? `.${absoluteNumber.split('.')[1]}`
  //       : '';
  // } else {
  //   partBeforeDot = number.split('.')[0];
  //   partAfterDot =
  //     number.split('.')[1] != null ? `.${number.split('.')[1]}` : '';
  // }

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

/* export function formatNumber(number) {
  // console.log('input number for formatting', number);

  if (number === CALCULATOR.dot) {
    // console.log('returned number because number is a dot', number);
    return number;
  }

  let minusPrefix = '';
  let partBeforeDot;
  let partAfterDot;

  if (number.slice(0, 1) === '-') {
    minusPrefix = '-';
    const absoluteNumber = number.slice(1);
    partBeforeDot = absoluteNumber.split('.')[0];
    partAfterDot =
      absoluteNumber.split('.')[1] != null
        ? `.${absoluteNumber.split('.')[1]}`
        : '';
  } else {
    partBeforeDot = number.split('.')[0];
    partAfterDot =
      number.split('.')[1] != null ? `.${number.split('.')[1]}` : '';
  }

  if (/\D/g.test(partBeforeDot) || partBeforeDot.length <= 3) {
    // console.log(
    //   'no digits or part before dot <= 3',
    //   `${minusPrefix}${partBeforeDot}${partAfterDot}`
    // );
    return `${minusPrefix}${partBeforeDot}${partAfterDot}`;
  }

  const inputValue = partBeforeDot.split('');

  let formattedNumber = '';

  while (inputValue.length > 3) {
    formattedNumber = `,${inputValue.splice(-3).join('')}${formattedNumber}`;
  }

  // console.log(
  //   'formatted number',
  //   `${minusPrefix}${inputValue.join('')}${formattedNumber}${partAfterDot}`
  // );

  return `${minusPrefix}${inputValue.join(
    ''
  )}${formattedNumber}${partAfterDot}`;
} */

export function unformatNumber(number) {
  if (/,/g.test(number)) {
    return number.split(',').join('');
  }
  return number;
}
