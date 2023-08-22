const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const { CastError, ValidationError } = require('mongoose').Error;
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const { getJwtToken } = require('../utils/jwt');
// ForbiddenError,
const {
  BadRequestError,
  NotFoundError,
  ConflictError,

} = require('../errors/errors');

const removePassword = ({ password, ...rest }) => rest;
const createProfile = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      userModel.create({
        name, about, avatar, email, password: hash,
      })
        .then(() => {
          const userInfo = removePassword(req.body);
          return res.status(HTTP_STATUS_CREATED).send(userInfo);
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже существует'));
          }
          if (err instanceof ValidationError) {
            next(new BadRequestError(`Ошибка валидации: ${err.message}`));
          }
          next(err);
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  userModel
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = getJwtToken({ _id: user._id, email: user.email });
      return res.status(HTTP_STATUS_OK).send({ token });
    })
    .catch(next);
};

const getProfileById = (req, res, next) => {
  const { id } = req.params;
  return userModel.findById(id)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError(`Ошибка Id: ${err.message}`));
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
  const { name, about, email } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, about, email },
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

// текущий пользователь
const getCurrentUser = (req, res, next) => {
  userModel.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.message === 'NotFound') {
        next(new NotFoundError('Пользователь не найден'));
      } else next(err);
    });}

module.exports = {
  createProfile,
  getProfileById,
  getUsersList,
  updateProfile,
  changeAvatar,
  getCurrentUser,
  login,
};
