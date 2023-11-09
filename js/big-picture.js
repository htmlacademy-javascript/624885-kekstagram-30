import { isEscapeKey } from './utils.js';

const MAX_COMMENTS_SHOWN = 2;
const bigPictureElement = document.querySelector('.big-picture');
const closeBigPicture = bigPictureElement.querySelector('#picture-cancel');

const onPictureCancelButtonClick = () => {
  hideBigPicture();
};

closeBigPicture.addEventListener('click', onPictureCancelButtonClick);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
};

const showBigPicture = (target) => {
  const picture = bigPictureElement.querySelector('.big-picture__img img');
  picture.src = target.url;
  picture.alt = target.description;

  bigPictureElement.querySelector('.social__caption').textContent = target.description;
  bigPictureElement.querySelector('.likes-count').textContent = target.likes;

  const comments = target.comments.length;
  const commentsShown = comments > MAX_COMMENTS_SHOWN ? MAX_COMMENTS_SHOWN : comments;
  bigPictureElement.querySelector('.social__comment-total-count').textContent = comments;
  bigPictureElement.querySelector('.social__comment-shown-count').textContent = commentsShown;

  const commentsContainer = bigPictureElement.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  const commentTemplate = document.querySelector('#comment')
    .content
    .querySelector('.social__comment');
  const commentsFragment = document.createDocumentFragment();

  for(let i = 0;i < commentsShown;i++) {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = target.comments[i].avatar;
    commentElement.querySelector('.social__picture').alt = target.comments[i].name;
    commentElement.querySelector('.social__text').textContent = target.comments[i].message;
    commentsFragment.append(commentElement);
  }
  commentsContainer.append(commentsFragment);

  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function hideBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

export {showBigPicture};
