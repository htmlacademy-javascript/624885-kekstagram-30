import { getRandomNumber, getRandomArrayElement } from './utils';

const COMMENTS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENTS_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const generateCommentId = (from, to) => {
  const commentIds = [];
  return () => {
    let id = getRandomNumber(from, to);
    if (commentIds.length >= (to - from + 1)) {
      return null;
    }
    while(id in commentIds) {
      id = getRandomNumber(from, to);
    }
    commentIds.push(id);
    return id;
  };
};

const getCommentId = generateCommentId(1, 50);

const getCommentMessage = () => {
  if(getRandomNumber(0,1) === 1) {
    return `${getRandomArrayElement(COMMENTS_MESSAGES) } ${ getRandomArrayElement(COMMENTS_MESSAGES)}`;
  }
  return getRandomArrayElement(COMMENTS_MESSAGES);
};

const createComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${ getRandomNumber(1, 6) }.svg`,
  message: getCommentMessage(),
  name: getRandomArrayElement(COMMENTS_NAMES),
});

export { createComment };
