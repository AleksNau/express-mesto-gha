const jwt = require('jsonwebtoken');

const { SECRET_CODE = 'SECRET' } = process.env;

const getJwtToken = (payload) => jwt.sign(payload, SECRET_CODE, {
  expiresIn: '7d',
});

module.exports = {
  getJwtToken,
};
