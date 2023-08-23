const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getProfileById, getUsersList, updateProfile, changeAvatar, getCurrentUser,
} = require('../controllers/users');

const {
  validationUpdateUser,
  validationUpdateAvatar,
} = require('../middlewares/validation');
// создание пользователя
router.get('/me', getCurrentUser);
// получить пользователя по id
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), getProfileById);

// получить всех пользователей
router.get('/', getUsersList);

router.patch('/me', validationUpdateUser, updateProfile);

router.patch('/me/avatar', validationUpdateAvatar, changeAvatar);

module.exports = router;
