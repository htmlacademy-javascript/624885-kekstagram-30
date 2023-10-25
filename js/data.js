import { getRandomNumber } from './utils';
import { createComment } from './comments';

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


const createPost = (postId) => ({
  id: postId,
  url: `photos/${ postId }.jpg`,
  description: DESCRIPTIONS[postId],
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(1, 5)}, createComment)
});

const createPosts = () => {
  const posts = [];
  for(let i = 1;i <= 25;i++) {
    posts.push(createPost(i));
  }
  return posts;
};

export { createPosts };
