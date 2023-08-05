const cardModel = require('../models/cards');

const getCards = (req, res) => {
    return cardModel.find()
    .then((users)=> {
      res.status(200).send(users);
    })
    .catch((err) => res.status(500).send('server error'))
}

const createCard = (req, res) => {
  return cardModel.create({...req.body})
    .then((card)=> {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: `${Object.values(err.errors).map((err) => err.message).join(", ")}`
        });}
      console.error();
      return res.status(500).send('server error')//должна быть 400 ошибка
    })
}

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  return cardModel.findById(cardId)
    .then((card) => {
      return cardModel.deleteOne({"_id" : cardId}).then(() => res.send({ message: 'Карточка успешно удалена' }));
    })
}

module.exports = {
    getCards,
    createCard,
    deleteCard
}