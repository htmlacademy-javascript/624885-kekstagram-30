import { showComments } from './comments.js';
import { closeByEscape } from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const closeBigPicture = bigPictureElement.querySelector('#picture-cancel');
const commentsLoaderElement = bigPictureElement.querySelector('.social__comments-loader');

let comments = [];

const onLoaderClick = (evt) => {
  evt.preventDefault();
  showComments(comments);
};
commentsLoaderElement.addEventListener('click', onLoaderClick);

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onPictureCancelButtonClick = () => {
  hideBigPicture();
};
closeBigPicture.addEventListener('click', onPictureCancelButtonClick);

function onDocumentKeydown(evt) {
  closeByEscape(evt, hideBigPicture);
}

const showBigPicture = (target) => {
  const picture = bigPictureElement.querySelector('.big-picture__img img');
  picture.src = target.url;
  picture.alt = target.description;

  bigPictureElement.querySelector('.social__caption').textContent = target.description;
  bigPictureElement.querySelector('.likes-count').textContent = target.likes;

  comments = target.comments;
  showComments(comments);

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

export {showBigPicture};
