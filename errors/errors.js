const serverError = require('./serverError');
const cardError = require('./cardNotFound');
const castErrorAnswer = require('./castError');
const validationErrorAnswer = require('./validationError');
const userNotFound = require('./userNotFound');

module.exports = {
  validationErrorAnswer,
  serverError,
  cardError,
  castErrorAnswer,
  userNotFound,
};
