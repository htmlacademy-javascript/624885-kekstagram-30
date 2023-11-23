const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';
const HttpMethod = {
  GET: 'GET',
  POST: 'POST'
};
const ServerRoutes = {
  [HttpMethod.GET]: '/data',
  [HttpMethod.POST]: '/'
};

const request = async (url, method = HttpMethod.GET, body = null) => {
  const response = await fetch(url, { method, body });
  if(! response.ok) {
    throw new Error();
  }
  return response.json();
};

const getPictures = async () => request(SERVER_URL + ServerRoutes.GET);

const sendForm = async (data) => request(SERVER_URL + ServerRoutes.POST, HttpMethod.POST, data);

export { getPictures, sendForm } ;

