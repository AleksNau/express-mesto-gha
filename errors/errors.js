const {
  HTTP_STATUS_BAD_REQUEST,
} = require('http2').constants;
const serverError = require('./serverError');
const BadRequestError = require('./BadRequestError');
const NotFoundError = require('./NotFoundError');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || HTTP_STATUS_BAD_REQUEST;
  const message = statusCode === HTTP_STATUS_BAD_REQUEST ? 'На сервере ошибка' : err.message;
  res.status(statusCode).send({ message });
  next(err);
};

/*
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
});

*/
module.exports = {
  serverError,
  BadRequestError,
  NotFoundError,
  errorHandler,
};
