const { HTTP_STATUS_BAD_REQUEST } = require('http2').constants;

const validationError = (res, err) => {
  res.status(HTTP_STATUS_BAD_REQUEST).send({
    message: `${Object.values(err.errors).map((item) => item.message).join(', ')}`,
  });
};

module.exports = validationError;
