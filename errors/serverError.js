const serverError = (res) => {
  res.status(500).send({ message: 'server error' });
};

module.exports = serverError;
