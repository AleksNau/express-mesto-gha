const mongoose = require('mongoose');

const cardsShema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        minlength:3,
        required:true
    },
    link:{
        type:URL,
        required:true
    }
})

module.exports = mongoose.model('cards',cardsShema);