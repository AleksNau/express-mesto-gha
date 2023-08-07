const serverError = require('./serverError');
const cardError = require('./cardNotFound');
const castError = require('./castError');
const validationError = require('./validationError');
const userNotFound = require('./userNotFound');

module.exports = {
  validationError,
  serverError,
  cardError,
  castError,
  userNotFound,
};
