import { renderPictures } from './pictures.js';
import { getUniqRandomNumbers, debounce } from './utils.js';

const Filters = {
  DEFAULT: 'DEFAILT',
  RANDOM: 'RANDOM',
  DISCUSSED: 'DISCUSSED'
};
const RANDOM_PICTURES_QTY = 10;

const imageFilters = document.querySelector('.img-filters');
const defaultButton = imageFilters.querySelector('#filter-default');
const randomButton = imageFilters.querySelector('#filter-random');
const discussedButton = imageFilters.querySelector('#filter-discussed');

const getRandomPictures = (data) => {
  const picturesQty = Math.min(data.length, RANDOM_PICTURES_QTY);
  const randomIndexes = getUniqRandomNumbers(0, data.length - 1, picturesQty);
  return randomIndexes.map((item) => data[item]);
};

const getDiscussedPictures = (data) => data.slice().sort((item1, item2) => item2.comments.length - item1.comments.length);
const debouncedRender = debounce(renderPictures);

const applyFilter = (filter, data) => {
  let filteredData;
  switch(filter) {
    case Filters.DEFAULT:
      filteredData = data;
      break;
    case Filters.RANDOM:
      filteredData = getRandomPictures(data);
      break;
    case Filters.DISCUSSED:
      filteredData = getDiscussedPictures(data);
      break;
  }
  debouncedRender(filteredData);
};
const changeActiveButton = (button) => {
  const currentActiveFilter = imageFilters.querySelector('.img-filters__button--active');
  currentActiveFilter.classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

const onDefaultButtonClick = (data) => {
  changeActiveButton(defaultButton);
  applyFilter(Filters.DEFAULT, data);
};

const onRandomButtonClick = (data) => {
  changeActiveButton(randomButton);
  applyFilter(Filters.RANDOM, data);
};

const onDiscussedButtonClick = (data) => {
  changeActiveButton(discussedButton);
  applyFilter(Filters.DISCUSSED, data);
};

const initFilters = (data) => {
  imageFilters.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', () => {
    onDefaultButtonClick(data);
  });
  randomButton.addEventListener('click', () => {
    onRandomButtonClick(data);
  });
  discussedButton.addEventListener('click', () => {
    onDiscussedButtonClick(data);
  });
};

export { initFilters };
