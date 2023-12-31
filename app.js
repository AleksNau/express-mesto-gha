const express = require('express');
const { default: mongoose } = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
require('dotenv').config();
const { validationCreateUser, validationLogin } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');
const {
  createProfile,
  login,
} = require('./controllers/users');

// const { errorHandler } = require('./errors/errors');

const { PORT = 3000, MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('mangoo включено');
});

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(helmet());

module.exports.createCard = () => {
};
// импортированили роуты
const router = require('./routes/index');

app.use(express.json());
// подключили роуты юзера
app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createProfile);

app.use(auth);
app.use(router);

app.use(errors());
app.use(handleError);
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
