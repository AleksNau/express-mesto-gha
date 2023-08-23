const {
  HTTP_STATUS_BAD_REQUEST,
} = require('http2').constants;

const BadRequestError = require('./BadRequestError');
const NotFoundError = require('./NotFoundError');
const ConflictError = require('./ConflictError');
const ForbiddenError = require('./ForbiddenError');
const UnauthorizedError = require('./UnauthorizedError');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || HTTP_STATUS_BAD_REQUEST;
  const message = statusCode === HTTP_STATUS_BAD_REQUEST ? 'На сервере ошибка' : err.message;
  res.status(statusCode).send({ message });
  next(err);
};

module.exports = {
  BadRequestError,
  NotFoundError,
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
  errorHandler,
};
