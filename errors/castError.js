const castError = (res) => {
  res.status(400).send({ message: 'Передан некорретный Id' });
};

module.exports = castError;
