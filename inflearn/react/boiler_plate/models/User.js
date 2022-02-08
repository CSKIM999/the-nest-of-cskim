const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type : String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true, // trim : john ahn@naver.com 에서 공백을 trim 이 알아서 없애줌

    unique: 1 // 똑같은 이메일은 중복이 안되게
  },
  password: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0 // 임의로 지정되지 않았다면 기본값 0 : 회원 1 : 관리자

  },
  image: String,
  token: { // 나중에 유효성 검사용
    type: String
  },
  tokenExp: { // 토큰의 유효기간 설정
    type: Number
  },
})

const User = mongoose.model('User',userSchema)

module.exports = {User}