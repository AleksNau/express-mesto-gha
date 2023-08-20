const { HTTP_STATUS_OK, HTTP_STATUS_CREATED,HTTP_STATUS_FORBIDDEN } = require("http2").constants;
const { CastError, ValidationError } = require("mongoose").Error;
const bcrypt = require("bcrypt");
const userSchema = require("../models/user");
const {getJwtToken} = require('../utils/jwt')

const {
  userNotFound,
  serverError,
  validationErrorAnswer,
  castErrorAnswer,
  BadRequestError,
  NotFoundError,
  UserAlreadyExistsError
} = require("../errors/errors");
const {unauthorizedError} = require("../errors/unauthorizedError");

const createProfile = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    userSchema
      .create({
        name, about, avatar, email, password: hash,
      })
      .then((user) => res.status(HTTP_STATUS_CREATED).send(
        user

      ))
      .catch((err) => {
        if (err.code === 11000) {
          next(new UserAlreadyExistsError('Пользователь с таким email уже существует'));
        }
        if (err instanceof ValidationError) {
          next(new BadRequestError({
            message: `${Object.values(err.errors).map((item) => item.message).join(', ')}`,
          }));
        }
        next(err)
      });

  })
};

const getProfileById = (req, res,next) => {
  const { id } = req.params;
  return userSchema
    .findById(id)
    .orFail(() => {
       throw new NotFoundError('Запрашиваемый пользователь не найден')})
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof CastError) next(new BadRequestError('Передан некорретный Id'))
      next(err);
    });
  // 404,500
};

const getUsersList = (req, res,next) =>{
  userSchema
    .find()
    .then((users) => {
      res.status(HTTP_STATUS_OK).send(users);
    })
    .catch(next)}
// 400,500 next(new unauthorizedError())})

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  userSchema
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден')})
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError({
          message: `${Object.values(err.errors).map((item) => item.message).join(', ')}`,
        }));
      }
      next(err)
    });
  // 400,404,500
};

const changeAvatar = (req, res,next) => {
  const { avatar } = req.body;
  userSchema
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден')})
    .then((user) => {
      return res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError({
          message: `${Object.values(err.errors).map((item) => item.message).join(', ')}`,
        }));
      }
      next(err)
    });
  // 400,404,500
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  userSchema.findOne({email}).select('+password')
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден')})
    .then((user) => {
      bcrypt.compare(password, user.password)
    .then((result) => {
      if(!result) {
        return res.status(HTTP_STATUS_FORBIDDEN).send({ message: 'пароль не верный' })
      }
      const token = getJwtToken({ _id: user._id, email: user.email });
      res.status(HTTP_STATUS_OK).send({token})
  });
  })
  .catch(next);
  // 404,500*/
};

module.exports = {
  createProfile,
  getProfileById,
  getUsersList,
  updateProfile,
  changeAvatar,
  login,
};
