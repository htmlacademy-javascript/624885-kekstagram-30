const DESCRIPTIONS = [
  'Пляж',
  'Табличка',
  'Залив',
  'Девушка-фотограф',
  'Два супа',
  'Крутая тачка',
  'Клубничка',
  'Морсы',
  'Самолёт',
  'Обувь',
  'Заборы',
  'Ауди',
  'Салат',
  'Котосуши',
  'Угги',
  'Небо',
  'Хор',
  'Старый автомобиль',
  'Ночь',
  'Пальмы',
  'Завтрак',
  'Закат',
  'Краб',
  'Концерт',
  'Атака бегемотов',
];

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

function getRandomNumber(from, to) {
  if (to > from) {
    return Math.round(Math.random() * (to - from) + from);
  }
  return undefined;
}

const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

const commentIds = {};
const getCommentId = () => {
  let id = getRandomNumber(1,1000);
  while(id in commentIds) {
    id = getRandomNumber(1,1000);
  }
  return id;
};

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

const createPost = (postId) => ({
  id: postId,
  url: `photos/${ postId }.jpg`,
  description: DESCRIPTIONS[postId],
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(1, 5)}, createComment)
});

const posts = [];
for(let i = 0;i < 25;i++) {
  posts.push(createPost(i));
}
