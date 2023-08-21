const router = require('express').Router();
const {
  createProfile, getProfileById, getUsersList, updateProfile, changeAvatar,
} = require('../controllers/users');
const {
  validationUpdateUser,
  validationUpdateAvatar,
  validationUserId,
} = require('../middlewares/validation');
// создание пользователя
router.post('/', createProfile);
// получить пользователя по id
router.get('/:id', validationUserId, getProfileById);

// получить всех пользователей
router.get('/', getUsersList);

router.patch('/me', validationUpdateUser, updateProfile);

router.patch('/me/avatar', validationUpdateAvatar, changeAvatar);

module.exports = router;
