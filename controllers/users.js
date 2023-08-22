const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const { CastError, ValidationError } = require('mongoose').Error;
const userModel = require('../models/user');

const {
  castErrorAnswer,
  BadRequestError,
  NotFoundError,
} = require('../errors/errors');

const createProfile = (req, res, next) => userModel.create({ ...req.body })
  .then((user) => {
    res.status(HTTP_STATUS_CREATED).send(user);
  })
  .catch((err) => {
    if (err instanceof ValidationError) {
      next(new BadRequestError(`Ошибка валидации: ${err.message}`));
    }
    next(err);
  });

const getProfileById = (req, res, next) => {
  const { id } = req.params;
  return userModel.findById(id)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof CastError) {
        return castErrorAnswer(res);
      }
      return next(err);
    });
  // 404,500
};

const getUsersList = (req, res, next) => userModel.find()
  .then((users) => {
    res.status(HTTP_STATUS_OK).send(users);
  })
  .catch(next);
// 400,500

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError(`Ошибка валидации: ${err.message}`));
      }

      next(err);
    });
  // 400,404,500
};

const changeAvatar = (req, res, next) => {
  const { avatar } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError(`Ошибка валидации: ${err.message}`));
      }
      next(err);
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
