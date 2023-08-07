const cardError = (res) => {
  res.status(404).send({
    message: 'Карточка с указанным _id не найдена',
  });
};

module.exports = cardError;
