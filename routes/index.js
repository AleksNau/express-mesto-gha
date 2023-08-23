const router = require('express').Router();
const {
  NotFoundError,
} = require('../errors/errors');

const userRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', userRouter);
router.use('/cards', cardsRouter);
router.use((req, res, next) => next(new NotFoundError('Такая страница не существует')));

module.exports = router;
