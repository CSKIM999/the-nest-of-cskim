const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema => DB 의 detail
const favoriteSchema = mongoose.Schema({
  userFrom : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  movieId : {
    type: String
  },
  movieTitle : {
    type: String
  },
  moviePost : {
    type: String
  },
  movieRunTime : {
    type: String
  }
}, { timestamps:true})





// 적어도 이 강의에서 사용되는 model 은 각각의 Schema를 묶어주는 바인더역할
const Favorite = mongoose.model('Favorite',favoriteSchema)

module.exports = { Favorite }