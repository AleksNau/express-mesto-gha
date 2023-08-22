const router = require('express').Router();
const {
  getProfileById, getUsersList, updateProfile, changeAvatar,getCurrentUser
} = require('../controllers/users');
// создание пользователя
router.get('/me', getCurrentUser);
// получить пользователя по id
router.get('/:id', getProfileById);

// получить всех пользователей
router.get('/', getUsersList);


router.patch('/me', updateProfile);

router.patch('/me/avatar', changeAvatar);



module.exports = router;
