const {
  HTTP_STATUS_BAD_REQUEST,
} = require('http2').constants;
const serverError = require('./serverError');
const cardError = require('./cardNotFound');
const castErrorAnswer = require('./castError');
const validationErrorAnswer = require('./validationError');
const userNotFound = require('./userNotFound');
const BadRequestError = require('./BadRequestError');
const NotFoundError = require('./NotFoundError');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || HTTP_STATUS_BAD_REQUEST;
  const message = statusCode === HTTP_STATUS_BAD_REQUEST ? 'На сервере ошибка' : err.message;
  res.status(statusCode).send({ message });
  next(err);
};

module.exports = {
  validationErrorAnswer,
  serverError,
  cardError,
  castErrorAnswer,
  userNotFound,
  BadRequestError,
  NotFoundError,
  errorHandler,
};
