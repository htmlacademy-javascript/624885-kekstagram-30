import { sendForm } from './api.js';
import { resetEffect } from './effects.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';
import { initScale } from './scale.js';
import { checkArrayForDublicates, isEscapeKey } from './utils.js';

const MAX_HASHTAG_COUNT = 5;

const SubmitButtonText = {
  SENDING: 'Отправляю...',
  IDLE: 'Опубликовать'
};

const formElement = document.querySelector('#upload-select-image');
const inputFileElement = formElement.querySelector('.img-upload__input');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const overlayCancelButton = formElement.querySelector('.img-upload__cancel');
const overlaySubmitButton = formElement.querySelector('.img-upload__submit');

const hashtagsInput = formElement.querySelector('.text__hashtags');
const descriptionInput = formElement.querySelector('.text__description');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
}, false);

const hideUploadOverlay = () => {
  overlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  formElement.reset();
  pristine.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
  resetEffect();
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagsInput ||
  document.activeElement === descriptionInput;

const isErrorMessageExist = () => Boolean(document.querySelector('.error'));

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageExist()) {
    evt.preventDefault();
    hideUploadOverlay();
  }
}

const onUploadCancelButtonClick = () => {
  hideUploadOverlay();
};
overlayCancelButton.addEventListener('click', onUploadCancelButtonClick);

const showUploadOverlay = () => {
  overlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  initScale();
};

const onInputFileChange = () => {
  showUploadOverlay();
};
inputFileElement.addEventListener('change', onInputFileChange);


const descriptionValidator = (value) => value.length < 140;
pristine.addValidator(descriptionInput, descriptionValidator,'Длина комментария больше 140 символов');

const hashtagValidate = (hashtag) => /^#[a-zа-яё0-9]{1,19}$/i.test(hashtag);
const hashtagStringToArray = (hashTagString) => hashTagString.trim().split(' ').filter((tag) => Boolean(tag.length));

const hashtagValidator = (value) => hashtagStringToArray(value).every(hashtagValidate);
const hashtagDublicateValidator = (value) => checkArrayForDublicates(hashtagStringToArray(value));
const hastagLengthValidator = (value) => hashtagStringToArray(value).length <= MAX_HASHTAG_COUNT;

pristine.addValidator(hashtagsInput, hashtagDublicateValidator, 'хэш-теги повторяются');
pristine.addValidator(hashtagsInput, hastagLengthValidator, 'Превышено количество хэш-тегов');
pristine.addValidator(hashtagsInput, hashtagValidator, 'Введён невалидный хэш-тег');

const toggleSubmitButton = (isSending) => {
  overlaySubmitButton.disabled = isSending;
  overlaySubmitButton.textContent = isSending
    ? SubmitButtonText.SENDING
    : SubmitButtonText.IDLE;
};

const sendFormData = async (form) => {
  if(!pristine.validate()) {
    return;
  }
  try {
    toggleSubmitButton(true);
    await sendForm(new FormData(form));
    toggleSubmitButton(false);
    hideUploadOverlay();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

formElement.addEventListener('submit', onFormSubmit);
