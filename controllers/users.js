const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require("http2").constants;
const { CastError, ValidationError } = require("mongoose").Error;
const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const saltRounds = 10;

const {
  userNotFound,
  serverError,
  validationErrorAnswer,
  castErrorAnswer,
} = require("../errors/errors");

const createProfile = (req, res) => {
  const { password, name, email, avatar, about } = req.body;
  bcrypt
    .hash(password, saltRounds)
    .then(
      (hash) => userModel.create({ password: hash, name, email, avatar, about }) // ...req.body
    )
    .then((user) => {
      res.status(HTTP_STATUS_CREATED).send(user);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        return validationErrorAnswer(res, err);
      }
      return serverError(res);
    });
};

const getProfileById = (req, res) => {
  const { id } = req.params;
  return userModel
    .findById(id)
    .orFail(() => userNotFound(res))
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof CastError) {
        return castErrorAnswer(res);
      }
      return serverError(res);
    });
  // 404,500
};

const getUsersList = (req, res) =>
  userModel
    .find()
    .then((users) => {
      res.status(HTTP_STATUS_OK).send(users);
    })
    .catch(() => serverError(res));
// 400,500

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    )
    .orFail(() => userNotFound(res))
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return validationErrorAnswer(res, err);
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
      { new: true, runValidators: true }
    )
    .then((user) => {
      if (!user) {
        return userNotFound(res);
      }
      return res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        return validationErrorAnswer(res, err);
      }
      return serverError(res);
    });
  // 400,404,500
};

const login = (req, res) => {
  const { email, password } = req.params;
  userModel.findOne({email})
  .then((user) => {
    if (!user) {
      return userNotFound(res);//403
    }
    bcrypt.compare(password, user.password)
    .then((result) => {
      if(!result) {
        return res.status(404).send({ message: 'пароль не верный' })
      }
      res.status(HTTP_STATUS_OK).send({message:'пароль верный'})
      // result == true
  });
  })
  .catch((err) => {
    return serverError(res);
  });
  /*return что-то
    .orFail(() => userNotFound(res))
    .then(() => res.status(HTTP_STATUS_OK).send())
    .catch((err) => {
      if (err instanceof CastError) {
        return castErrorAnswer(res);
      }
      return serverError(res);
    });
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
