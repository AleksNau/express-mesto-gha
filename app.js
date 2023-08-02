mongoose.connect('mongodb://localhost:27017/mestodb',{
  useNewUrlParser:true
}).then(()=> {
  console.log('mangoo включено')
})

const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const port = 3000
const path = require('path')
const cards = require('./cards.json');
const bodyParser = require('body-parser')

const user = require('./models/user')
const card = require('./models/cards')
app.use(bodyParser.json());
//получить всех пользователей
app.get('/users', (req, res) => {
  res.status(201).send('профиль пользователя')
})
//получить пользователя по id
app.get('/users/:userId', (req, res) => {
  res.status(200).send('профиль пользователя')
})
//отправка карточек
app.get('/cards', (req, res) => {
  res.status(200).send(cards)
})
//создание пользователя
app.post('/users', (req, res) => {
  res.send('регистрация')
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