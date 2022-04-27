const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const saltRounds = 10; 
const jwt = require('jsonwebtoken')


// schema => DB 의 detail
const userSchema = mongoose.Schema({
  name : {
    type : String,
    maxlength : 50
  },
  email: {
    type : String,
    trim : true,
    unique : 1
  },
  password : {
    type  : String,
    minlength : 5
  },
  lastName : {
    type  : String,
    maxlength : 50
  },
  role : {
    type  : Number,
    default : 0
  },
  image : String,
  token : {
    type  : String,
  },
  tokenExp : {
    type  : Number
  }
})

userSchema.pre('save', function (next) {// pre('save') 는 몽구스에서 가져온 'save' 작업 하기 전에 무언가 하겠단 뜻
  let user = this;
  if (user.isModified('password')){
    bcrypt.genSalt(saltRounds,function(err, salt){
      if (err) return next(err)
      bcrypt.hash(user.password, salt, function(err, hash){
        if (err) return next(err)
        user.password = hash 
        next()
      })
    })
  } else {
    next()
  }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
  // plainPassword = 1234 암호화 비밀번호 ~%#%#@ㅑㅗㅇㄴㅁ 의 체크
  // 비밀번호를 복호화할 수 없기에 plainPassword 를 암호화 하여 비밀번호와 일치체크

  bcrypt.compare(plainPassword,this.password,function(err , isMatch) {
    if (err) return cb(err);
    cb(null, isMatch)
  })

}

userSchema.methods.genToken = function(cb) {
  // jsonwebtoken 이용해서 token 생성
  let user = this
  let token = jwt.sign(user._id.toHexString(), 'secretToken')
  user.token = token
  user.save(function(err,user) {
    if (err) return cb(err)
    cb(null, user)
  })
}

userSchema.statics.findByToken = function(token, cb){ 
  let user = this;

  // verify() : token decode
  jwt.verify(token, 'secretToken', function(err, decoded) {
    user.findOne({"_id": decoded, "token":token }, function(err,user){
      if (err) return cb(err);
      cb(null,user)
    })
  })
}



// 적어도 이 강의에서 사용되는 model 은 각각의 Schema를 묶어주는 바인더역할
const User = mongoose.model('User',userSchema)

module.exports = { User }