const getRandomNumber = (from, to) => {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(to), Math.abs(from)));
  return Math.round(Math.random() * (upper - lower) + lower);
};

const getUniqRandomNumbers = (from, to, qty) => {
  const randomNumbers = [];
  while (randomNumbers.length < qty) {
    const randomNumber = getRandomNumber(from, to);
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }
  return randomNumbers;
};

const checkArrayForDublicates = (array) => array.every((item, index) => array.indexOf(item) === index);

const isEscapeKey = (evt) => evt.key === 'Escape';

const closeByEscape = (evt, callback) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    callback();
  }
};

const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export { getUniqRandomNumbers, isEscapeKey, closeByEscape, checkArrayForDublicates, debounce};
