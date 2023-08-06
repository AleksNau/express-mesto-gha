const express = require('express');
const router = require('express').Router();

const userRouter = require('./users')
const cardsRouter = require('./cards')

router.use('/users',userRouter);
router.use("/cards",cardsRouter);
router.use((req, res) => {
  return res.status(404).send({message:'Такая страница не существует'});
});


module.exports = router;