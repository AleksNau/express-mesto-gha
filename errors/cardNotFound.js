const { HTTP_STATUS_NOT_FOUND } = require('http2').constants;

const cardError = (res) => {
  res.status(HTTP_STATUS_NOT_FOUND).send({
    message: 'Карточка с указанным _id не найдена',
  });
};

module.exports = cardError;
