export function formatNumber(number) {
  if (/^\D/g.test(number) || /\./g.test(number) || number.length <= 3)
    return number;

  const inputValue = number.split('');

  let formattedNumber = '';

  while (inputValue.length > 3) {
    formattedNumber = `,${inputValue.splice(-3).join('')}${formattedNumber}`;
    // inputValue.split('').splice(-3).join('');
  }

  return `${inputValue.join('')}${formattedNumber}`;
}

export function unformatNumber(number) {
  if (/,/g.test(number)) {
    return number.split(',').join('');
  }
  return number;
}
