const express = require('express')
// express 모듈 가져오기
const app = express()
// 새로운 app 만들기
const port = 5000
// 포트 설정
const bodyParser = require("body-parser");
const { User } = require("./models/User");

//application/x-www-form-urlencoded
//이렇게 된 데이터를 분석할 수 있게 만듬
app.use(bodyParser.urlencoded({extended: true}));
//application/json 데이터를 분석하여 활용
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jth9339:zheng9339@boilerplate.kfqtosn.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {res.send('Hello World! 안녕하세요lolololol')})


app.post('/register', (req, res) =>{

    //회원가입할 때 필요한 정보들을 client에서 가져오면
    //그것을 DB에 넣어줌

    const user = new User(req.body)

    user.save((err, userInfo) =>{
        if(err) return res.jason({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})