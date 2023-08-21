const {
  HTTP_STATUS_INTERNAL_SERVER_ERROR
} = require('http2').constants; 
const cardError = require('./cardNotFound');
const castErrorAnswer = require('./castError');
const validationErrorAnswer = require('./validationError');
const userNotFound = require('./userNotFound');
const UserAlreadyExistsError = require('./UserAlreadyExistsError')
const ForbiddenError = require('./ForbiddenError')
const NotAuthorizedError = require('./NotAuthorizedError')
const BadRequestError = require('./BadRequestError')
const NotFoundError = require('./NotFoundError')

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR ? 'на сервере ошибка' : err.message;
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
  validationErrorAnswer,
  cardError,
  castErrorAnswer,
  userNotFound
};
