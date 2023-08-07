const userNotFound = (res) => {
  res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
};

module.exports = userNotFound;