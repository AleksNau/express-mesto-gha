const router = require('express').Router();
const { createProfile, getProfileById, getUsersList, updateProfile, changeAvatar} = require("../controllers/users");
//создание пользователя
router.post('/users', createProfile)
//получить пользователя по id
  router.get('/users/:id', getProfileById)

  //получить всех пользователей
  router.get('/users', getUsersList)

  router.patch('/users/me', updateProfile)

  router.patch('/users/me/avatar', changeAvatar)

  module.exports = router;