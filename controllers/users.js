const userModel = require('../models/user');
const userNotFound = require('../errors/notFound');
const serverError = require('../errors/serverError');

const createProfile = (req, res) => userModel.create({ ...req.body })
  .then((user) => {
    res.status(201).send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: `${Object.values(err.errors).map((item) => item.message).join(', ')}`,
      });
    }
    return res.status(500).send(serverError);
  });

const getProfileById = (req, res) => {
  const { id } = req.params;
  return userModel.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send(userNotFound);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан некорретный Id' });
      }
      return res.status(500).send(serverError);
    });
  // 404,500
};

const getUsersList = (req, res) => userModel.find()
  .then((users) => {
    res.status(200).send(users);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: `${Object.values(err.errors).map((item) => item.message).join(', ')}`,
      });
    }
    return res.status(500).send(serverError);
  });
// 400,500

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (!user) {
        return res.status(404).send(userNotFound);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({
          message: `${Object.values(err.errors).map((item) => item.message).join(', ')}`,
        });
      }

      return res.status(500).send(serverError);
    });
  // 400,404,500
};

const changeAvatar = (req, res) => {
  const { avatar } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true },
    )
    .then((user) => {
      if (!user) {
        return res.status(404).send(userNotFound);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: `${Object.values(err.errors).map((item) => item.message).join(', ')}`,
        });
      }
      return res.status(500).send(serverError);
    });
  // 400,404,500
};

module.exports = {
  createProfile,
  getProfileById,
  getUsersList,
  updateProfile,
  changeAvatar,
};
