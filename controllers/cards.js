const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const { CastError, ValidationError } = require('mongoose').Error;
const cardModel = require('../models/cards');

const {
  serverError, cardError, castErrorAnswer, validationErrorAnswer,
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
      if (err instanceof ValidationError) {
        return validationErrorAnswer(res, err);
      }
      return serverError(res);
    });
};// 400,500

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  return cardModel.findById(cardId)
    .orFail(() => cardError(res))
    .then(() => cardModel.deleteOne({ _id: cardId }).then(() => res.send({ message: 'Карточка успешно удалена' })))
    .catch((err) => {
      if (err instanceof CastError) {
        return castErrorAnswer(res);
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
    .orFail(() => cardError(res))
    .then((card) => res.status(HTTP_STATUS_OK).send({ data: card }))
    .catch((err) => {
      if (err instanceof CastError) {
        return castErrorAnswer(res);
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
    .orFail(() => cardError(res))
    .then((card) => res.status(HTTP_STATUS_OK).send({ data: card }))
    .catch((err) => {
      if (err instanceof CastError) {
        return castErrorAnswer(res);
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
