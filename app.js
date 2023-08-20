const express = require('express');
const { default: mongoose } = require('mongoose');
const {auth} = require('./middlewares/auth')
const {errorHandler} = require('./errors/errors')

const {
  createProfile, login
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

app.post('/signin', login);
app.post('/signup', createProfile);

// подключили роуты юзера
app.use(auth)
app.use(router);

app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  //console.log(costa)
});


