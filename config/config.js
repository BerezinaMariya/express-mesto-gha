const SALT_ROUND = 10;
const URL_REGEX = /^(http|https):\/\/[w{3}.]?[\w-._~:/?#[\]@!$&'()*+,;=]#?/;
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
];

module.exports = {
  SALT_ROUND,
  URL_REGEX,
  DEFAULT_ALLOWED_METHODS,
  allowedCors,
};
