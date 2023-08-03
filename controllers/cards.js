const cardModel = require('../models/cards');

const getCards = (req, res) => {
    return res.status(200).send(cards)
}

const createCard = (req, res) => {
    res.send('создание карточки');
}

const deleteCard = (req, res) => {
    res.send('удаление карточки');
}

module.exports = {
    getCards,
    createCard,
    deleteCard
}