import { showBigPicture } from './big-picture.js';
import { createPosts } from './data.js';
import { getFilnameFromURL } from './utils.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesList = createPosts();

const picturesFragment = document.createDocumentFragment();

picturesList.forEach(({url, description, comments, likes}) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  picturesFragment.appendChild(pictureElement);
});

picturesContainer.appendChild(picturesFragment);
picturesContainer.addEventListener('click', (evt) => {
  if(evt.target.matches('.picture__img')) {
    const element = picturesList.find((el) => getFilnameFromURL(el.url) === getFilnameFromURL(evt.target.src));
    showBigPicture(element);
  }
});
