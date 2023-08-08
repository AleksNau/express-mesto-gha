const {HTTP_STATUS_INTERNAL_SERVER_ERROR} = require('http2').constants;
const serverError = (res) => {
  res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'server error' });
};

module.exports = serverError;
