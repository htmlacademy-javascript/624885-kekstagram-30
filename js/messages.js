import { closeByEscape } from './utils.js';

const MESSAGE_TIMEOUT = 5000;

const dataErrorElement = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');

const showGetError = () => {
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, MESSAGE_TIMEOUT);
};

const successMessageElement = document
  .querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageElement = document
  .querySelector('#error')
  .content
  .querySelector('.error');

const hideMessage = () => {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

const onMessageButtonClick = () => {
  hideMessage();
};

function onDocumentKeydown(evt) {
  closeByEscape(evt, hideMessage);
}

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

const showMessage = (messageElement, buttonClass) => {
  document.body.append(messageElement);
  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  messageElement
    .querySelector(buttonClass)
    .addEventListener('click', onMessageButtonClick);
};

const showSuccessMessage = () => {
  showMessage(successMessageElement, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessageElement, '.error__button');
};

export { showGetError, showSuccessMessage, showErrorMessage };
