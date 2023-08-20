const jwt = require('jsonwebtoken');
const {SECRET_CODE = 'SECRET'} = process.env;
const userModel = require("../models/user");
const {
  serverError, cardError, castErrorAnswer, validationErrorAnswer,
} = require('../errors/errors');

const getJwtToken = (payload) => {
  return jwt.sign(payload,SECRET_CODE);
}

const isAuthorized = (token) => {
  return jwt.verify(token, SECRET_CODE, function(err, decoded) {
    if(err) return false;
    return userModel.findById(decoded._id)
      .then((user) => {

        return Boolean(user);
        //res.status(HTTP_STATUS_OK).send(user);
      })
      .catch(() => false);
  });
}
module.exports = {
  getJwtToken,
  isAuthorized
}