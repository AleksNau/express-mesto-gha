const {HTTP_STATUS_NOT_FOUND} = require('http2').constants;
const userNotFound = (res) => {
  res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
};

module.exports = userNotFound;
