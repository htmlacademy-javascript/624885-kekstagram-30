function getRandomNumber(from, to) {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(to), Math.abs(from)));
  return Math.round(Math.random() * (upper - lower) + lower);
}

const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

const checkArrayForDublicates = (array) => array.every((item, index) => array.indexOf(item) === index);

export {getRandomNumber, getRandomArrayElement, checkArrayForDublicates};
