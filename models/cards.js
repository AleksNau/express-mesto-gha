const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const cardsSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
      type:String,
      minlength:2,
      maxlength:30,
      required:true
    },
    link:{
        type:String,
        required:true
    },
    owner:{
      type: mongoose.Schema.Types.ObjectId,
      required:true
    },
    likes:{
      type: mongoose.Schema.Types.ObjectId,
      required:true
    },
    createdAt: {
      type: mongoose.Schema.Types.Date,
      required:true
    }
})

module.exports = mongoose.model('cards',cardsSchema);