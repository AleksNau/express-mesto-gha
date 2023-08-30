const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const { CastError, ValidationError } = require('mongoose').Error;
const cardModel = require('../models/cards');

const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors/errors');

const getCards = (req, res, next) => cardModel.find()
  .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
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
        return next(new BadRequestError(`Ошибка валидации: ${err.message}`));
      }
      return next(err);
    });
};// 400,500

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  return cardModel.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      }
      return cardModel.deleteOne({ _id: cardId }).then(() => res.send({ message: 'Карточка успешно удалена' }));
    })
    .catch((err) => {
      if (err instanceof CastError) {
        return next(new BadRequestError(`Ошибка Id: ${err.message}`));
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
        return next(new BadRequestError(`Ошибка Id: ${err.message}`));
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
        return next(new BadRequestError(`Ошибка Id: ${err.message}`));
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
