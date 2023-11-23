function getRandomNumber(from, to) {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(to), Math.abs(from)));
  return Math.round(Math.random() * (upper - lower) + lower);
}

const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

const checkArrayForDublicates = (array) => array.every((item, index) => array.indexOf(item) === index);

const isEscapeKey = (evt) => evt.key === 'Escape';

const closeByEscape = (evt, callback) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    callback();
  }
};

const getFilnameFromURL = (url) => url.split('/').pop();

export { getRandomNumber, getRandomArrayElement, isEscapeKey, closeByEscape, getFilnameFromURL, checkArrayForDublicates};
