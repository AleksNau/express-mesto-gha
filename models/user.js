const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
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
  about:{
    type:String,
    minlength:2,
    maxlength:30,
    required:true
  },
  avatar :{
    type:URL,
    required:true
  }
})

module.exports = mongoose.model('cards',userShema);