const express = require('express')
// express 모듈 가져오기
const app = express()
// 새로운 app 만들기
const port = 5000
// 포트 설정
const bodyParser = require("body-parser");
const config = require('./config/key');
const cookieParser = require('cookie-parser');

const { User } = require("./models/User");


//application/x-www-form-urlencoded
//이렇게 된 데이터를 분석할 수 있게 만듬
app.use(bodyParser.urlencoded({extended: true}));
//application/json 데이터를 분석하여 활용
app.use(bodyParser.json());

app.use(cookieParser());


const mongoose = require('mongoose');
const { json } = require('body-parser');
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {res.send('Hello World! 안녕하세요')})


app.post('/register', (req, res) =>{

    //회원가입할 때 필요한 정보들을 client에서 가져오면
    //그것을 DB에 넣어줌

    const user = new User(req.body)

    user.save((err, userInfo) =>{
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/login', (req, res) =>{
  //요청된 이메일을 데이터베이스에 있는지 찾는다.

  console.log('ping')
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다"
      })
    }
//요청된 이메일이 DB에 있다면 비밀번호 대조
    user.comparePassword(req.body.password, (err, isMatch ) => {
      if(!isMatch)
        return res.json({ 
          loginSuccess: false,
          message:"비밀번호 오류"
      })
//비밀번호까지 같다면 토큰을 생성하기.
      user.generateToken((err, user)=> {
        if(err) return res.status(400).send(err);

        //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
        res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess:true, userId: user._id })
      })
    })

  })
})






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})