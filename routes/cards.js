const router = require("express").Router();
const { getCards, createCard, deleteCard } = require("../controllers/cards");
//отправка карточек
router.get("/cards", getCards);//400,500

router.post("/cards", createCard);//400,500

router.delete("/cards/:cardId", deleteCard);//404

router.put("/cards/:cardId/likes", (req, res) => {
  res.send("запрос добавляет лайк карточке");//400,404,500
});
router.delete("/cards/:cardId/likes", (req, res) => {
  res.send("запрос удаляет лайк с карточки");//400,404,500
});

module.exports = router;
