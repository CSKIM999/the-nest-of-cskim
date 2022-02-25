const {User} = require('../models/User')

let auth = (req, res, next) => {
  // 인증처리 하는곳
  
  // todo...
  // client 쿠키에서 token 가져오기
  let token = req.cookies.x_auth;
  // Token 복호화한 후 유저 찾기 << UserModel 에서 메서드를 만들기
  User.findByToken(token, (err,user) => {
    if (err) throw err;
    if (!user) return res.json( {isAuth: false, error: true})
    req.token = token;
    req.user = user;
    next() // next 를 써주는 이유는 app.get('/api/users/auth', auth , (req, res) =>{}) 에서 auth 에 갇혀버림.
    // (req,res) 부로 넘어가기위해 next 던져주기
  })
  // User 있으면 인증 OK 없으면 NO



}

module.exports = { auth };