const { HTTP_STATUS_BAD_REQUEST } = require('http2').constants;

const castError = (res) => {
  res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Передан некорретный Id' });
};

module.exports = castError;
