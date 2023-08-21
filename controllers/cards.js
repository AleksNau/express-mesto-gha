const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const { CastError, ValidationError } = require('mongoose').Error;
const cardModel = require('../models/cards');
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError
} = require('../errors/errors');

const getCards = (req, res,next) => cardModel.find()
  .then((users) => res.status(HTTP_STATUS_OK).send(users))
  .catch(next);;// 400,500

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return cardModel.create({ owner, name, link })
    .then((card) => {
      res.status(HTTP_STATUS_CREATED).send(card);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }

    });
};// 400,500

const deleteCard = (req, res,next) => {
  const { cardId } = req.params;
  return cardModel.findById(cardId)
  .orFail(() => {
    throw new NotFoundError('Запрашиваемая карточка не найдена');
  })
    .then(() => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Вы не можете удалить чужую карточку'));
      }
      return cardModel.deleteOne({ _id: cardId }).then(() => res.send({ message: 'Карточка успешно удалена' }))})
      .catch(next);
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
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
// 400,404,500
};
// убрать лайк
const deleteLikes = (req, res,next) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((card) => res.status(HTTP_STATUS_OK).send({ data: card }))
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Переданы некорректные данные для удаления лайка'));
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
