const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { auth } = require('./middleware/auth')
const { User } = require('./models/User')

const config = require('./config/key')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api/favorite', require('./routes/favorite'))
// www form 의 data 와 json 타입의 data 를 받아와 사용할것




const mongoose = require('mongoose')


mongoose.connect(config.mongoURI,{}).then(() => console.log('MongoDB CONNECTED...'))
  .catch(err => console.log(err))

  
app.post('/api/users/register', (req,res) => {
  // 받아온 DATA 들을 parse 해서 DB 에 넣기
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if (err) return res.json({success: false, err})
      return res.status(200).json({// status 200 은 성공코드
        success: true
      })
  })
})

app.post('/api/users/login', (req,res) => {
  // 1. 요청 이메일 존재여부, 2. 1이 true 라면 비밀번호 확인  3. 2도 맞다면 토큰생성
  //1
  User.findOne({ email : req.body.email }, (err , user) => {
    if (!user) {
      return res.json({
        loginSuccess : false,
        message : '이메일이 일치하지 않습니다'
      })
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json( {loginSuccess : false , message : '비밀번호가 일치하지 않습니다'})
      
      user.genToken((err, user) => {
        if (err) return res.status(400).send(err)
        res.cookie('x_auth', user.token)
        .status(200)
        .json({loginSuccess: true, userId : user._id})
        // 토큰 쿠키에 저장
      })
    })
  })
})

app.get('/api/users/auth', auth , (req,res) => {
  // middleware auth 를 통과한 내용만 여기 도착할 수 있음.
  // 따라서 auth = true 를 받았다는 말
  res.status(200).json({
    _id : req.user._id, // mw auth 에서 req.user 에 user를 넣어서 가능
    isAdmin : req.user.role === 0 ? false : true, // 0 normal, 1 admin
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout' , auth , (req, res) =>{
  User.findOneAndUpdate({_id: req.user._id},
    {token: ""},
    (err,user) =>{
      if (err) return res.json({seccess:false, err});
      return res.status(200).send({
        success:true
      })
    }) // get(*,auth,*) 에서 auth 를 사용했기때문에, req.user._id 사용가능
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))