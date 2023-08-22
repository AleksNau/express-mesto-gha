const {
  HTTP_STATUS_BAD_REQUEST,
} = require('http2').constants;
const UserAlreadyExistsError = require('./UserAlreadyExistsError');
const ForbiddenError = require('./ForbiddenError');
const NotAuthorizedError = require('./NotAuthorizedError');
const BadRequestError = require('./BadRequestError');
const NotFoundError = require('./NotFoundError');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || HTTP_STATUS_BAD_REQUEST;
  const message = statusCode === HTTP_STATUS_BAD_REQUEST ? 'На сервере ошибка' : err.message;
  res.status(statusCode).send({ message });
  next(err);
};

module.exports = {
  UserAlreadyExistsError,
  ForbiddenError,
  NotAuthorizedError,
  BadRequestError,
  NotFoundError,
  errorHandler,
};
