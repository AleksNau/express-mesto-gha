const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

const { PORT = 3000, MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('mangoo включено');
});
const app = express();

const bodyParser = require('body-parser');

app.use((req, res, next) => {
  req.user = {
    _id: '64ce17208f756d4394a543aa', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
module.exports.createCard = (req, res) => {
};
// импортированили роуты
const router = require('./routes/index');

app.use(bodyParser.json());
// подключили роуты юзера
app.use(router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
