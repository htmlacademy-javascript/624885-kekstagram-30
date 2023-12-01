import './form.js';

import { getPictures } from './api.js';
import { showGetError } from './messages.js';
import { initPicturesListener, renderPictures } from './pictures.js';
import { initFilters } from './filters.js';

const bootstrap = async () => {
  try {
    const picturesList = await getPictures();
    initPicturesListener(picturesList);
    renderPictures(picturesList);
    initFilters(picturesList);
  } catch(err) {
    showGetError();
  }
};

bootstrap();

