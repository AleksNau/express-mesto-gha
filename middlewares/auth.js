const jwt = require('jsonwebtoken');
const { isAuthorized } = require('../utils/jwt');

const { SECRET_CODE = 'SECRET' } = process.env;
const { UnauthorizedError } = require('../errors/errors');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;// req.cookie.jwt
  if (!isAuthorized(token)) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  const payload = jwt.verify(token, SECRET_CODE);
  req.user = payload;

  next();
};
