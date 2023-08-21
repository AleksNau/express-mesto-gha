const jwt = require('jsonwebtoken');
const { isAuthorized } = require('../utils/jwt');

const { SECRET_CODE = 'SECRET' } = process.env;
const { UnauthorizedError } = require('../errors/unauthorizedError');

const auth = (req, res, next) => {
  const token = req.headers.authorization;// req.cookie.jwt
  if (!isAuthorized(token)) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, SECRET_CODE);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;

  next();
};

module.exports = { auth };
