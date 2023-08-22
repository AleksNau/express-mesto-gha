const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const { errorHandler } = require('./errors/errors');

const { PORT = 3000, MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('mangoo включено');
});
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '64d0a023787b704a2200d0c7', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
module.exports.createCard = () => {
};
// импортированили роуты
const router = require('./routes/index');

app.use(express.json());
// подключили роуты юзера

app.use(router);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
