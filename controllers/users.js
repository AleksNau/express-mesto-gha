const userModel = require('../models/user');

const createProfile = (req, res) =>{
  return userModel.create({...req.body})
    .then((user)=> {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: `${Object.values(err.errors).map((err) => err.message).join(", ")}`
        });}
      console.error();
      return res.status(500).send('server error')//должна быть 400 ошибка
    })}

const getProfileById = (req, res) => {
  const {id} = req.params;
  return userModel.findById(id)
    .then((user)=> {
      if(!user) {
        return res.status(484).send('server error');
      }
      res.status(200).send(user);
    })
    .catch((err) => res.status(500).send('server error'))
  //404,500
}

const getUsersList = (req, res) => {
  return userModel.find()
    .then((users)=> {
      res.status(200).send(users);
    })
    .catch((err) => res.status(500).send('server error'))
  //400,500
}

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true}
    )
    .then((user) => {
      res.status(200).send(user);
    })
  //400,404,500
}

const changeAvatar = (req, res) => {
  const { avatar } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true},
    )
    .then((user) => res.status(200).send(user))
  //400,404,500
}


  module.exports = {
  createProfile,
  getProfileById,
  getUsersList,
  updateProfile,
  changeAvatar
}