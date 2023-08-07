const cardModel = require('../models/cards');
const serverError = require('../errors/serverError');
const cardNotFound = require('../errors/cardNotFound');

module.exports.getCards = (req, res) => cardModel.find()
  .then((users) => {
    res.status(200).send(users);
  })
  .catch(() => res.status(500).send(serverError));// 400,500


  module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return cardModel.create({ owner, name, link })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: `${Object.values(err.errors).map((item) => item.message).join(', ')}`,
        });
      }
      return res.status(500).send(serverError);
    });
};// 400,500

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  return cardModel.findById(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send(cardNotFound);
      }
      return cardModel.deleteOne({ _id: cardId }).then(() => res.send({ message: 'Карточка успешно удалена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан некорретный Id' });
      }
      return res.status(500).send(serverError);
    });
};// 404

module.exports.getLikes = (req, res) => {
   cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        return res.status(404).send(cardNotFound);
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send(cardNotFound);
      }
      return res.status(500).send(serverError);
    });
// 400,404,500
};
// убрать лайк
module.exports.deleteLikes = (req, res) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        return res.status(404).send(cardNotFound);
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send(cardNotFound);
      }
      return res.status(500).send(serverError);
    });
// 400,404,500
};

