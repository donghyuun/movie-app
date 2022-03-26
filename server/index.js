const express = require('express')
const app = express()
const port = 5000;
const bodyparser = require('body-parser');
const URL = "..."
const mongoose = require('mongoose');//mongoDB 사용
const { User } = require('./models/User');
const { auth } = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const { reset } = require('nodemon');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cookieParser());

mongoose.connect(URL,{
    useUnifiedTopology: true})
.then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err))

app.listen(port, ()=>{
    console.log(`Serer is running on port ${port}`);
})
//////////////////////////////////////////////////////////
app.post('/api/users/register', (req,res) => {
  const user = new User(req.body)
  console.log(user);
  user.save((err, userInfo) => {
    if(err){return res.json({success:false, err})}
    return res.status(200).json({ success:true })
  })
})
//////////////////////////////////////////////////////////
app.post('/api/users/login', (req, res) => {
  User.findOne({email:req.body.email}, (err, user) => {
  //유저 없으면
  if(!user){
    return res.json({
      loginSuccess:false,
      message: "제공된 이메일에 해당하는 유저가 없습니다."
    })
  }

  //유저 있으면
  user.comparePassword(req.body.password, (err, isMatch)=>{
    //비밀번호 일치X
    if(!isMatch) {return res.status(400).send(err)}
    
    //비밀번호 일치O
    user.generateToken((err, user) => {
      //토큰 생성시 오류 발생 O
      if(err) return res.status(400).send(err);
      //오류 발생 X => 쿠키에 토큰 저장
      res.cookie("x_auth", user.token)
      .status(200)
      .json({loginSuccess: true, userId: user._id})
    })
  })
})
})

app.get('/api/users/auth', auth, (req, res) => {
  //여기까지 왔으면 미들웨어를 통과해 왔다는 애기(authentication = true)
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false: true,//0이면 일반유저 이외엔 관리자
    isAuth: true,
    email:req.user.email,
    name: req.user.name,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, user) => {//내장함수
    if(err) return res.json({success: false, err});
    return res.status(200).send({
      success:true
    })
  })//auth 미들웨어 이용
}) 

//root 디렉토리에 오면 hello world를 출력한다
app.get('/api/hello', (req, res) => res.send('hello world'))
