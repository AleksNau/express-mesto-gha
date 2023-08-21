const {
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
} = require('http2').constants; const serverError = require('./serverError');
const cardError = require('./cardNotFound');
const castErrorAnswer = require('./castError');
const validationErrorAnswer = require('./validationError');
const userNotFound = require('./userNotFound');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_BAD_REQUEST;
  }
}

class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_FORBIDDEN;
  }
}

class UserAlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_FORBIDDEN;
  }
}

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'на сервере ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = {
  UserAlreadyExistsError,
  ForbiddenError,
  NotAuthorizedError,
  BadRequestError,
  NotFoundError,
  errorHandler,
  validationErrorAnswer,
  serverError,
  cardError,
  castErrorAnswer,
  userNotFound,
};
