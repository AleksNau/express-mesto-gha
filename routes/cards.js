const router = require("express").Router();
const { getCards, createCard, deleteCard,  getLikes, deleteLikes } = require("../controllers/cards");
//отправка карточек
router.get("/cards", getCards);//400,500

router.post("/cards", createCard);//400,500

router.delete("/cards/:cardId", deleteCard);//404

router.put("/cards/:cardId/likes", getLikes);
router.delete("/cards/:cardId/likes", deleteLikes);

module.exports = router;
