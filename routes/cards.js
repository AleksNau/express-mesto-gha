const router = require("express").Router();
const {getCards,createCard,deleteCard} = require('../controllers/cards')
//отправка карточек
router.get("/cards",getCards);

router.post("/",createCard);

router.delete("/",deleteCard);

module.exports = router;
