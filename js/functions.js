const checkStringLength = function (str, len) {
  return str.length <= len;
};

const checkReversableString = function (str) {
  const normalizedString = str.replaceAll(' ','').toLowerCase();
  const newString = normalizedString.split('').reverse().join('');
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

const strToMinutes = (str) => {
  const splittedString = str.split(':');
  return parseInt(splittedString[0], 10) * 60 + parseInt(splittedString[1], 10);
};

const checkTime = (startWorkDay, endWorkDay, startMeeting, duration) => {
  const startWorkDayMinutes = strToMinutes(startWorkDay);
  const endWorkDayMinutes = strToMinutes(endWorkDay);
  const startMeetingMinutes = strToMinutes(startMeeting);

  if (startMeetingMinutes < startWorkDayMinutes || startMeetingMinutes + duration > endWorkDayMinutes) {
    return false;
  }
  return true;
};

console.log(checkTime('08:00', '17:30', '14:00', 90)); // true
console.log(checkTime('8:0', '10:0', '8:0', 120));     // true
console.log(checkTime('08:00', '14:30', '14:00', 90)); // false
console.log(checkTime('14:00', '17:30', '08:0', 90));  // false
console.log(checkTime('8:00', '17:30', '08:00', 900)); // false

checkStringLength('проверяемая строка', 20);
checkReversableString('Лёша на полке клопа нашёл ');
getNumberFromString('1 кефир, 0.5 батона');
