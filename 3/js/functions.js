const checkStringLength = function (str, len) {
  return str.length <= len;
};

const checkRevesableString = function (str) {
  const normalizedString = str.replaceAll(' ','').toLowerCase();
  const newString = normalizedString.split('').reverse().join('');

  // let newString = '';
  // for (let i = normalizedString.length - 1; i >= 0; i--) {
  //   newString += normalizedString[i];
  // }

  return normalizedString === newString;
};

const getNumberFromString = function (str) {
  str = str.toString();
  let resultString = '';
  for(let i = 0; i < str.length; i++) {
    if(!isNaN(parseInt(str[i], 10))) {
      resultString += str[i];
    }
  }
  return parseInt(resultString, 10);
};

checkStringLength('проверяемая строка', 20);
checkRevesableString('Лёша на полке клопа нашёл ');
getNumberFromString('1 кефир, 0.5 батона');
