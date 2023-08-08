const cardModel = require('../models/cards');
const {HTTP_STATUS_OK,HTTP_STATUS_CREATED} = require('http2').constants;
const {
  serverError, cardError, castError, validationError,
} = require('../errors/errors');

const getCards = (req, res) => cardModel.find()
  .then((users) => res.status(HTTP_STATUS_OK).send(users))
  .catch(() => serverError(res));// 400,500

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return cardModel.create({ owner, name, link })
    .then((card) => {
      res.status(HTTP_STATUS_CREATED).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return validationError(res, err);
      }
      return serverError(res);
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
      return serverError(res);
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
      return res.status(HTTP_STATUS_OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return castError(res);
      }
      return serverError(res);
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
      return res.status(HTTP_STATUS_OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return castError(res);
      }
      return serverError(res);
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
