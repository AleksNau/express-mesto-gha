const userModel = require('../models/user');
const {
  userNotFound, serverError, validationError, castError,
} = require('../errors/errors');

const createProfile = (req, res) => userModel.create({ ...req.body })
  .then((user) => {
    res.status(201).send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return validationError(res, err);
    }
    return serverError(res);
  });

const getProfileById = (req, res) => {
  const { id } = req.params;
  return userModel.findById(id)
    .then((user) => {
      if (!user) {
        return userNotFound(res);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return castError(res);
      }
      return serverError(res);
    });
  // 404,500
};

const getUsersList = (req, res) => userModel.find()
  .then((users) => {
    res.status(200).send(users);
  })
  .catch(() => serverError(res));
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
        return userNotFound(res);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return validationError(res, err);
      }

      return serverError(res);
    });
  // 400,404,500
};

const changeAvatar = (req, res) => {
  const { avatar } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (!user) {
        return userNotFound(res);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return validationError(res, err);
      }
      return serverError(res);
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
