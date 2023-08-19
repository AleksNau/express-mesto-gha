const express = require('express');
const { default: mongoose } = require('mongoose');
const {auth} = require('./middlewares/auth')
const errorHandler = require('./middlewares/error-handler')

const {
  createProfile, login
} = require('./controllers/users');
require('dotenv').config();

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
app.use(auth)
app.post('/signin', login);
app.post('/signup', createProfile);
// подключили роуты юзера
app.use(errorHandler)
app.use(router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


