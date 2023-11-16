const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

const formElement = document.querySelector('#upload-select-image');
const smallerButton = formElement.querySelector('.scale__control--smaller');
const biggerButton = formElement.querySelector('.scale__control--bigger');
const scaleValueElement = formElement.querySelector('.scale__control--value');
const imageElement = formElement.querySelector('.img-upload__preview');

let scaleValue = MAX_SCALE;

const changeScale = () => {
  scaleValueElement.value = `${scaleValue}%`;
  imageElement.style.transform = `scale(${scaleValue / 100})`;
};

const onSmallerButtonClick = () => {
  if(scaleValue === MIN_SCALE) {
    return;
  }
  scaleValue -= SCALE_STEP;
  changeScale();
};
smallerButton.addEventListener('click', onSmallerButtonClick);

const onBiggerButtonClick = () => {
  if(scaleValue === MAX_SCALE) {
    return;
  }
  scaleValue += SCALE_STEP;
  changeScale();
};
biggerButton.addEventListener('click', onBiggerButtonClick);

const initScale = () => {
  scaleValue = MAX_SCALE;
  changeScale();
};

export { initScale };
