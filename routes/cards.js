const router = require("express").Router();
const { getCards, createCard, deleteCard,  getLikes, deleteLikes } = require("../controllers/cards");
//отправка карточек
router.get("/", getCards);

router.post("/", createCard);

router.delete("/:cardId", deleteCard);

router.put("/:cardId/likes", getLikes);
router.delete("/:cardId/likes", deleteLikes);

module.exports = router;
