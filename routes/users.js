const router = require('express').Router();
const userModel = require('../models/user');
//создание пользователя
router.post('/users', (req, res) => {
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
    })
  })
//получить пользователя по id
  router.get('/users/:id', (req, res) => {
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
  })

  //получить всех пользователей
  router.get('/users', (req, res) => {
    return userModel.find()
        .then((users)=> {
          res.status(200).send(users);
        })
        .catch((err) => res.status(500).send('server error'))
    //400,500
  })

  router.patch('/users/me', (req, res) => {
    res.send('запрос обновляет информацию о пользователе.')
    //400,404,500
  })

  router.patch('/users/me/avatar', (req, res) => {
    res.send('запрос обновляет аватар пользователя.')
    //400,404,500
  })

  module.exports = router;