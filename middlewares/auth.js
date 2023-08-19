const {isAuthorized} = require('../utils/jwt')
const {unauthorizedError} = require('../errors/unauthorizedError')

const auth = (req,res,next) => {
  const token = req.headers.authorization;//req.cookie.jwt
  if(!isAuthorized(token)){
    next(new unauthorizedError('необходима авторизация'))
  }
  next();
}


module.exports = {auth};