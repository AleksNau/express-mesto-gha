mongoose.connect('mongodb://localhost:27017/mestodb',{
  useNewUrlParser:true
}).then(()=> {
  console.log('mangoo включено')
})

const express = require('express');
const { default: mongoose } = require('mongoose');

const app = express();
const port = 3000;
const path = require('path');

const cards = require('./cards.json');
const bodyParser = require('body-parser');

const userModel = require('./models/user');
const cardModel = require('./models/cards');

app.use(bodyParser.json());
//получить всех пользователей
app.get('/users', (req, res) => {
  return userModel.find()
      .then((users)=> {
        res.status(200).send(users);
      })
      .catch((err) => res.status(500).send('server error'))
  
})
//получить пользователя по id
app.get('/users/:id', (req, res) => {
  const {id} = req.params;
  return userModel.findById(id)
      .then((user)=> {
        if(!user) {
          return res.status(484).send('server error');
        }
        res.status(200).send(user);
      })
      .catch((err) => res.status(500).send('server error'))
})
//отправка карточек
app.get('/cards', (req, res) => {
  return res.status(200).send(cards)
})
//создание пользователя
app.post('/users', (req, res) => {
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
  res.send('регистрация');
})


app.post('/', (req, res) => {
  res.send('создание карточки')
})

app.delete('/', (req, res) => {
  res.send('удаление карточки')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})