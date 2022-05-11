const mongoose = require('mongoose');
const Schema = require('mongoose')
// IN RDBMS ( MYSQL... ) : DATABASE => TABLES => ROWS => COLUMNS
// IN MONGODB  :  DATABASE => COLLECTIONS => DOCUMENTS => FIELDS 
// 위와 같이 일반적으로 사용하는 DB 와 MongoDB 의 용어가 조금 다름. 참고.

const videoSchema = mongoose.Schema({
  writer : {
    // Id 를 가지고 'User' 라는 Schema 에 가서 해당 ID 의 정보를 전부 긁어서 가져옴
    type : Schema.Types.ObjectId,
    ref:'User'
  },
  title : {
    type : String,
    maxlength : 100
  },
  description : {
    type :  String
  },
  privacy : {
    type: Number
  },
  filePath : {
    type: String
  },
  category : {
    type: String
  },
  views : {
    type: Number,
    default : 0
  },
  duration : {
    type: String
  },
  thumbnail : {
    type: String
  }

}, { timestamps : true })



// 적어도 이 강의에서 사용되는 model 은 각각의 Schema를 묶어주는 바인더역할
const Video = mongoose.model('Video',videoSchema)

module.exports = { Video }