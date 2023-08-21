const express = require('express');
const { default: mongoose } = require('mongoose');
const helmet = require('helmet');
const auth = require('./middlewares/auth');
const { errorHandler } = require('./errors/errors');
const { validationCreateUser, validationLogin } = require('./middlewares/validation');

const {
  createProfile, login,
} = require('./controllers/users');
require('dotenv').config();

const { PORT = 3000, MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('mangodb включено');
});
const app = express();

module.exports.createCard = () => {
};
// импортированили роуты
const router = require('./routes/index');

app.use(express.json());

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createProfile);

// подключили роуты юзера
app.use(auth);
app.use(router);
app.use(helmet());

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
