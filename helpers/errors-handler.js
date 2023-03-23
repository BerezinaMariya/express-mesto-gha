const {
  INTERNAL_SERVER_ERROR_500,
  INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../config/config');

module.exports.handleErrors = (err, req, res, next) => {
  const { statusCode, message } = err;

  res.status(
    statusCode
    ? statusCode
    : INTERNAL_SERVER_ERROR_500
  ).send({
    message: statusCode === INTERNAL_SERVER_ERROR_500
      ? INTERNAL_SERVER_ERROR_MESSAGE
      : message,
  });

  next();
};
