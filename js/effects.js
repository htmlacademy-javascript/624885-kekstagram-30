const EFFECTS = {
  none: {
    effect: 'none',
    min: 0,
    max: 1,
    step: 0.1,
    units: ''
  },
  chrome: {
    effect: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    units: ''
  },
  sepia: {
    effect: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    units: ''
  },
  marvin: {
    effect: 'invert',
    min: 0,
    max: 100,
    step: 1,
    units: '%'
  },
  phobos: {
    effect: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    units: 'px'
  },
  heat: {
    effect: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    units: ''
  }
};

const formElement = document.querySelector('#upload-select-image');
const sliderPlaceElement = formElement.querySelector('.img-upload__effect-level');
const sliderElement = formElement.querySelector('.effect-level__slider');
const sliderInput = formElement.querySelector('.effect-level__value');
const imageElement = formElement.querySelector('.img-upload__preview img');
const effectElements = formElement.querySelectorAll('.effects__radio');

let currentEffect = 'none';

sliderPlaceElement.classList.add('hidden');
noUiSlider.create (sliderElement, {
  range: { min:0, max:100},
  start:100,
  step: 1,
  connect: 'lower'
});

const updateSlider = ({min, max, step}) => {
  sliderElement.noUiSlider.updateOptions ({
    range: {
      min,
      max
    },
    start: max,
    step
  });
};

const applySlider = (filterString) => {
  imageElement.style.filter = filterString;
};

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  sliderInput.value = Number(value);
  const filterString = currentEffect.effect === 'none' ? 'none' : `${currentEffect.effect}(${value}${currentEffect.units})`;
  applySlider(filterString);
});

const onEffectsRadioChange = (evt) => {
  if(evt.target.value === 'none') {
    sliderPlaceElement.classList.add('hidden');
  } else {
    sliderPlaceElement.classList.remove('hidden');
  }
  currentEffect = EFFECTS[evt.target.value];
  updateSlider(currentEffect);
};
effectElements.forEach((element) => element.addEventListener('change', onEffectsRadioChange));

const resetEffect = () => {
  sliderPlaceElement.classList.add('hidden');
  updateSlider(EFFECTS['none']);
};

export { resetEffect };

