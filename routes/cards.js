const router = require("express").Router();
const { getCards, createCard, deleteCard,  getLikes, deleteLikes } = require("../controllers/cards");
//отправка карточек
router.get("/", getCards);//400,500

router.post("/", createCard);//400,500

router.delete("/:cardId", deleteCard);//404

router.put("/:cardId/likes", getLikes);
router.delete("/:cardId/likes", deleteLikes);

module.exports = router;
