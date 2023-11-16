const MAX_COMMENTS_SHOWN = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentsContainer = bigPictureElement.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const commentsTotalElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsShownElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

let commentsCountShown = 0;

const createComment = ({avatar, name, message}) => {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const showComments = (comments) => {
  commentsCountShown += MAX_COMMENTS_SHOWN;
  if(commentsCountShown >= comments.length) {
    commentsCountShown = comments.length;
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
  commentsContainer.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();

  for(let i = 0;i < commentsCountShown;i++) {
    const commentElement = createComment(comments[i]);
    commentsFragment.append(commentElement);
  }
  commentsContainer.append(commentsFragment);

  commentsTotalElement.textContent = comments.length;
  commentsShownElement.textContent = commentsCountShown;
};

const initComments = () => {
  commentsCountShown = 0;
};

export {showComments, initComments};
