

const express = require('express');
const { default: mongoose } = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mestodb',{
  useNewUrlParser:true
}).then(()=> {
  console.log('mangoo включено')
})
const app = express();
const port = 3000;
const path = require('path');

const cards = require('./cards.json');
const bodyParser = require('body-parser');

const userModel = require('./models/user');
const cardModel = require('./models/cards');
//импортированили роуты 
const router = require('./routes/index')

app.use(bodyParser.json());
//подключили роуты юзера
app.use(router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})