const {isAuthorized} = require('../utils/jwt')

const auth = (req,res,next) => {
  const token = req.headers.authorization;//req.cookie.jwt
  if(!isAuthorized(token)){
    return res.status(401).send({ message: 'необходима авторизация' });
  }
  next();
}

module.exports = {auth};