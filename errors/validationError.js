const validationError = (res, err) => {
  res.status(400).send({
    message: `${Object.values(err.errors).map((item) => item.message).join(', ')}`,
  });
};

module.exports = validationError;
