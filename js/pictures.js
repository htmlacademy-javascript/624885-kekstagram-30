import { showBigPicture } from './big-picture.js';
import { initComments } from './comments.js';
import { createPosts } from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesList = createPosts();

const picturesFragment = document.createDocumentFragment();

picturesList.forEach(({url, description, comments, likes, id}) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.dataset.pictureId = id;

  picturesFragment.appendChild(pictureElement);
});

picturesContainer.appendChild(picturesFragment);
picturesContainer.addEventListener('click', (evt) => {
  const picture = evt.target.closest('[data-picture-id]');
  if(picture) {
    evt.preventDefault();
    const element = picturesList.find(({id}) => id === +picture.dataset.pictureId);
    initComments();
    showBigPicture(element);
  }
});
