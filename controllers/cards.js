const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const { CastError, ValidationError } = require('mongoose').Error;
const cardModel = require('../models/cards');

const {
  castErrorAnswer, BadRequestError,
  NotFoundError,
} = require('../errors/errors');

const getCards = (req, res, next) => cardModel.find()
  .then((users) => res.status(HTTP_STATUS_OK).send(users))
  .catch(next);// 400,500

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return cardModel.create({ owner, name, link })
    .then((card) => {
      res.status(HTTP_STATUS_CREATED).send(card);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError(`Ошибка валидации: ${err.message}`));
      }
      next(err);
    });
};// 400,500

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  return cardModel.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .then(() => cardModel.deleteOne({ _id: cardId }).then(() => res.send({ message: 'Карточка успешно удалена' })))
    .catch((err) => {
      if (err instanceof CastError) {
        return castErrorAnswer(res);
      }
      return next(err);
    });
};// 404

const getLikes = (req, res, next) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .then((card) => res.status(HTTP_STATUS_OK).send({ data: card }))
    .catch((err) => {
      if (err instanceof CastError) {
        return castErrorAnswer(res);
      }
      return next(err);
    });
// 400,404,500
};
// убрать лайк
const deleteLikes = (req, res, next) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .then((card) => res.status(HTTP_STATUS_OK).send({ data: card }))
    .catch((err) => {
      if (err instanceof CastError) {
        return castErrorAnswer(res);
      }
      return next(err);
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
