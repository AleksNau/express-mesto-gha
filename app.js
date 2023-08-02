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
app.use(bodyParser.json());

app.get('/user', (req, res) => {
  res.status(201).send('профиль пользователя')
})
//отправка карточек
app.get('/cards', (req, res) => {
  res.status(200).send(cards)
})

app.post('/', (req, res) => {
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