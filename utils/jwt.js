const jwt = require('jsonwebtoken');

const { SECRET_CODE = 'SECRET' } = process.env;
const userModel = require('../models/user');

const getJwtToken = (payload) => jwt.sign(payload, SECRET_CODE);

const isAuthorized = (token) => jwt.verify(token, SECRET_CODE, (err, decoded) => {
  if (err) return false;
  return userModel.findById(decoded._id)
    .then((user) => Boolean(user))
    .catch(() => false);
});
module.exports = {
  getJwtToken,
  isAuthorized,
};
