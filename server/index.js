const express = require('express')
const app = express()
const port = 5000;
const bodyparser = require('body-parser');
const db = require('./config/key');
const mongoose = require('mongoose');//mongoDB 사용
const { User } = require('./models/User');
const { Comment } = require('./models/Comment');
const { auth } = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const { reset } = require('nodemon');
const { Blog } = require('./models/Blog');
const multer = require('multer');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cookieParser());

mongoose.connect(db.mongoURI,{
    useUnifiedTopology: true})
.then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err))

app.listen(port, ()=>{
    console.log(`Sever is running on port ${port}`);
})
/////////////////////////////////////////////
app.post("/api/comments/get",(req,res) => {
  console.log(req.body.movieId);
  Comment.find({movieId: req.body.movieId}, (err, commentList) => {
    console.log(commentList);
    if(!commentList){return res.json({
      commentSuccess:false,
      message: "해당 영화에 해당하는 댓글이 없습니다."
    })}else{
      let commentListArray = commentList;
      res.json({
        commentList: commentListArray,
        commentSuccess: true
      })
    }
  })
})

//////////////////////////////////////////////////////////
app.post('/api/users/login', (req, res) => {
  //정상적으로 res받아지는거 확인!
  console.log(req.body)
  User.findOne({email:req.body.email}, (err, user) => {
    console.log(user)
  //유저 없으면
  if(!user){
    console.log("유저없음")
    return res.json({
      loginSuccess:false,
      message: "제공된 이메일에 해당하는 유저가 없습니다."
    })
  }
  
  //유저 있으면, 여기까지 정상
  user.comparePassword(req.body.password, (err, isMatch)=>{
    //비밀번호 일치X
    console.log(`password: ${req.body.password}, isMatch: ${isMatch}`)
    if(!isMatch){ return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다"})}
    
    console.log("비밀번호 일치")
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
    console.log(`로그아웃 대상: ${user}`)
    if(err) return res.json({success: false, err});
    return res.status(200).send({
      success:true
    })
  })//auth 미들웨어 이용
}) 

//////////////////////////////////////////////////////////
app.post('/api/users/register', (req,res) => {
  const user = new User(req.body)
  console.log(user)
  user.save((err, userInfo) => {
    console.log(`userInfo=${userInfo}`);
    if(err){return res.json({success: false, err})}
    return res.status(200).json({ success:true })
  })
})
//////////////////////////////////////////////////////////
app.post('/api/comments/upload', auth, (req, res) => {
  //comment객체에 comment, movieId 들어있음
  const comment = new Comment(req.body)
  comment.save((err, commentInfo) => {
    console.log(`commentInfo=${commentInfo}`);
    if(err){return res.json({addSuccess: false, err})}
    return res.status(200).json({ addSuccess:true })
  })
})
/////////////////////////////////////////////////////////
const storage = multer.diskStorage(({
  //destination for files
  destination: function(req, file, cb){
    cb(null, './uploads/images')
  },

  filename: function(req, file, cb){
    cb(null, `${Date.now()}__ ${file.originalname}`)
  }
}))

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3
  }
})

let originalname = "";

app.post('/api/image', auth, upload.single('image'), (req, res) => {//upload.single의 image는 input의 name 과 동일
  console.log(req.file)

  originalname = req.file.originalname
  
  return res.json({success:true, url: res.req.file.path, fileName: res.req.file.filename})
})
app.post('/api/image/info', auth, (req,res)=>{

  const body = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    name: req.user.name,
    img: originalname,
    option: req.body.option
  }
  const blog = Blog(body);

  blog.save((err, blogInfo)=> {
    console.log(`blogInfo=${blogInfo}`);
  })

})

//post => "api/comments/upload", comment & movie id

//post => "api/comments/get", movieId

//post => "api/comments/delete", comment id

//post => "api/comments/edit", content & comment id



//root 디렉토리에 오면 hello world를 출력한다
app.get('/api/hello', (req, res) => res.send('hello world'))