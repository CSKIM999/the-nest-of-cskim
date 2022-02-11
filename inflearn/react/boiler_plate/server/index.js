const express = require('express')
const app = express()
const port = 5000

const config = require('./config/key');
const { User } = require('./models/User');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {auth} = require('./middleware/auth')

// bodyParser 는 Client 에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해주는 것

// application/x-www-form-urlencoded << 형식의 데이터를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true}));
// application/json << 형식의 json 데이터를 분석
app.use(bodyParser.json())
app.use(cookieParser());


mongoose.connect(config.mongoURI, {
  // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err=>console.log(err))
  app.get('/', (req,res) => res.send('Hello World! 안녕하세요! 새해 복 많이받으세요'))


  //register route 부
  app.post('/api/users/register',(req,res) => {
    // todo.. 회원가입시 필요한 정보를 client 에서 가져오면 그것들을 DB 에 넣어주기

    //모든 정보들을 모델에 넣어줌
    const user = new User(req.body) // req.body 안에는 json 형태로  id: *** /n password: *** 식으로 들어있음 << 이것이 bodyParser 가 해준것

    //save 전에 password 암호화
    user.save((err, userInfo) => { // << save 는 mongoDB 에서 온 메서드 ,
      if(err) return res.json({success : false, err}) // 만약 error 가 있다면 client 에 error 가 있다고 전달해주어야함
      return res.status(200).json({   //status(200) << 성공했다는 심볼
        success: true
      }) 
    })
  })

app.post('/api/users/login', (req, res) => {
  // todo... 1.요청된 이메일을 DB에 있는지 확인
  User.findOne({ email: req.body.email }, (err, user)=> {
    if(!user) { // user 가 없다면?
      return res.json({
        loginSuccess: false,
        message: "로그인 정보를 확인할 수 없습니다."
      })
    } else {
      // 1.1.요청이메일과 비밀번호가 서로 맞는지 확인
      
      user.comparePassword(req.body.password,(err, isMatch ) =>{
        if (!isMatch) 
          return res.json({loginSuccess:false, message: "P/W 가 틀렸습니다."})
        // 1.2. 비밀번호까지 맞다면 토큰 생성
        user.generateToken((err,user) =>{
          if (err) return res.status(400).send(err);
          
          // token의 저장 to 로컬스토리지
          res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess:true, userId: user._id })
        })
      })
    }
  })
})


// 인증 auth 부
app.get('/api/users/auth', auth , (req, res) =>{
  // auth 에서 req.user 값을 넣어주었기 때문에 여기서 req.user 값을 쓸 수 있음.
  // 만약 middleware 에서 막혔다면 지금 이 코드가 작성되는곳까지 올 수 없음
  // 그 말은 Authentication 이 True 라는 말. 따라서 그 정보를 client 에 전달해주어야 함
  res.status(200).json({
    _id: req.user._id,
    isAdmin:req.user.role === 0 ? false:true,
    isAuth:true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })


})


// 로그아웃 Route 부
// 로그아웃하려는 User 의 DB 를 찾아서 해당 유저의 token 을 지워주기
app.get('/api/users/logout', auth , (req, res) =>{
  console.log('logout')
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