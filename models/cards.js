const mongoose = require('mongoose');

const cardsShema = new mongoose.Schema({
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
        type:URL,
        required:true
    },
    owner:{
      type: ObjectId,
      required:true
    },
    likes:{
      type: ObjectId,
      required:true
    },
    createdAt: {
      type: data,
      required:true
    }
})

module.exports = mongoose.model('cards',cardsShema);