const router = require('express').Router();
const { createProfile, getProfileById, getUsersList, updateProfile, changeAvatar} = require("../controllers/users");
//создание пользователя
router.post('/', createProfile)
//получить пользователя по id
  router.get('/:id', getProfileById)

  //получить всех пользователей
  router.get('/', getUsersList)

  router.patch('/me', updateProfile)

  router.patch('/me/avatar', changeAvatar);

  module.exports = router;