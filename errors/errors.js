const serverError = require('./serverError');
const cardError = require('./cardNotFound');
const castError = require('./castError');
const validationError = require('./validationError');
const userNotFound = require('./notFound');

module.exports = {
  validationError,
  serverError,
  cardError,
  castError,
  userNotFound,
};
