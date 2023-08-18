const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require("http2").constants;
const { CastError, ValidationError } = require("mongoose").Error;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const userModel = require("../models/user");
const {SECRET_CODE = 'SECRET'} = process.env;


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

const getUsersList = (req, res) =>{
  //Закрываем роут токеном
 /* const token = req.headers.authorization;//проверить правильность и закинуть токен в хэдер
  jwt.verify(token, SECRET_CODE, function(err, decoded) {
    if(err) return res.status(401).send({ message: 'необходима авторизация' });
    userModel.findById(decoded._id)
    .then((user) => {
      if(!user) return res.status(401).send({ message: 'необходима авторизация' });
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch(() => serverError(res));
    console.log(decoded.foo) // bar
  });*/
  userModel
    .find()
    .then((users) => {
      res.status(HTTP_STATUS_OK).send(users);
    })
    .catch(() => serverError(res));}
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
  const { email, password } = req.body;
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
      const token = jwt.sign({ _id: user._id, email: user.email }, SECRET_CODE);
      res.status(HTTP_STATUS_OK).send({token})
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
