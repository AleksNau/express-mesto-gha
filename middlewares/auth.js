const jwt = require('jsonwebtoken');
const { isAuthorized } = require('../utils/jwt');

const { SECRET_CODE = 'SECRET' } = process.env;
const { UnauthorizedError } = require('../errors/unauthorizedError');

const auth = (req, res, next) => {
  const token = req.headers.authorization;// req.cookie.jwt
  if (!isAuthorized(token)) {
   return next(new UnauthorizedError('Необходима авторизация'));
  }
  let payload;
  payload = jwt.verify(token, SECRET_CODE);
  req.user = payload;

  next();
};

module.exports = { auth };
