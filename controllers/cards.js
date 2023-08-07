const cardModel = require('../models/cards');
const serverError = require('../errors/serverError');
const cardError = require('../errors/cardNotFound');
const castError = require('../errors/castError');
const validationError = require('../errors/validationError');

const getCards = (req, res) => cardModel.find()
  .then((users) => {
    res.status(200).send(users);
  })
  .catch(() => res.status(500).send(serverError));// 400,500

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return cardModel.create({ owner, name, link })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return validationError(res, err);
      }
      return res.status(500).send(serverError);
    });
};// 400,500

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  return cardModel.findById(cardId)
    .then((card) => {
      if (!card) {
        return cardError(res);
      }
      return cardModel.deleteOne({ _id: cardId }).then(() => res.send({ message: 'Карточка успешно удалена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return castError(res);
      }
      return res.status(500).send(serverError);
    });
};// 404

const getLikes = (req, res) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        return cardError(res);
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return castError(res);
      }
      return res.status(500).send(serverError);
    });
// 400,404,500
};
// убрать лайк
const deleteLikes = (req, res) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        return cardError(res);
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return castError(res);
      }
      return res.status(500).send(serverError);
    });
// 400,404,500
};
module.exports = {
  getCards,
  createCard,
  deleteCard,
  getLikes,
  deleteLikes,
};
