const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const saltRounds = 10; //salt 가 몇글자인가?

const jwt = require('jsonwebtoken')
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
    maxlength: "100"
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
  }

})


userSchema.pre('save', function( next ){
  var user = this;
  if (user.isModified('password')){
    // todo... 비밀번호 암호화
    // bcrypt 의 salt 를 이용해서 암호화
    bcrypt.genSalt(saltRounds,function(err, salt){
      if (err) return next(err)
      bcrypt.hash(user.password, salt, function(err, hash){
        if (err) return next(err)
        user.password = hash // 문제없이 hash 생성에 성공했다면, password 를 hash화 된 문자열로 교체
        next()
      }) // hash 의 첫번째 arg 는 string 형태의 순수 password
    })
  } else {
    next()
  }
}) // mongoose 의 메서드 { userSchema.pre('save'): usermodel 의 정보를 save 하기 전에 무언가를 할것이다!}

userSchema.methods.comparePassword = function (plainPassword, cb) {
  
  // plainPassword  :  1234  && 암호화 해시 : $2b$10$bTlNNEmzxZLbkTHk3zwwrup.CWFc8LIQzWPLeEFRAIs2G1heFLCse
  // 위에서 해시를 스트링으로 역주행시킬 순 없음. 따라서 받은 plainPassword 를 해시화시켜서 match 여부 확인하면 됨
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err)// 만약 str 과 hash 가 match하지 않는다면 err callback
     } else {
       cb(null, isMatch) // 일치한다면 err 없이 null return
     } 
  })
}

userSchema.methods.generateToken = function(cb) {
  var user = this;

  var token = jwt.sign(user._id.toHexString(),'secretToken') // sign 의 첫번째 arg 는 plainObject 를 받음. 따라서  user._id 를 toHexString 을 통해 재가공
  
  // user._id + 'secretToken' = token


  user.token = token
  user.save(function(err, user) {
    if (err) return cb(err)
    cb(null,user)
  })

}

userSchema.statics.findByToken = function(token, cb){ // methods 가 아닌 statics 를 사용한것 알아보기 (아마도 instance 에서 접근하지 못하도록 static method 로 설정한것이 아닐까 싶음)
  var user = this;
  // user._id + '' = token
  jwt.verify(token, 'secretToken', function(err, decoded) {
    // 유저 Id 를 이용해서 유저를 찾은 후 client 에서 가져온 token과 DB 의 token의 일치확인
    user.findOne({"_id": decoded, "token":token }, function(err,user){
      if (err) return cb(err);
      cb(null,user)
    })
  })
}


const User = mongoose.model('User',userSchema)

module.exports = {User}