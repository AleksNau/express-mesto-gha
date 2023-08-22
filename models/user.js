const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный адрес URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректый адрес почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
