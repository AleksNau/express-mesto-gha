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
router.get('/:id', getProfileById);

// получить всех пользователей
router.get('/', getUsersList);
//validationUpdateUser
router.patch('/me', updateProfile);
//validationUpdateAvatar
router.patch('/me/avatar', changeAvatar);

module.exports = router;
