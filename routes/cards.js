const router = require('express').Router();
const {
  getCards, createCard, deleteCard, getLikes, deleteLikes,
} = require('../controllers/cards');

const {
  validationCreateCard,
  validationCardById,
} = require('../middlewares/validation');
// отправка карточек
router.get('/', getCards);

router.post('/', validationCreateCard, createCard);

router.delete('/:cardId', validationCardById, deleteCard);

router.put('/:cardId/likes', validationCardById, getLikes);
router.delete('/:cardId/likes', validationCardById, deleteLikes);

module.exports = router;
