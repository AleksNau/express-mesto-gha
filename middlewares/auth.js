const {isAuthorized} = require('../utils/jwt')
const jwt = require('jsonwebtoken');
const {SECRET_CODE = 'SECRET'} = process.env;
const {unauthorizedError} = require('../errors/unauthorizedError')

const auth = (req,res,next) => {
  const token = req.headers.authorization;//req.cookie.jwt
  if(!isAuthorized(token)){
    next(new unauthorizedError('необходима авторизация'))
  }
  let payload;
  try {
    payload = jwt.verify(token, SECRET_CODE);
  } catch (err) {
    return next(new unauthorizedError('необходима авторизация'))
  }
  req.user = payload;

  next();
}


module.exports = {auth};