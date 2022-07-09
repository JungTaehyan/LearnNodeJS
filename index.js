const express = require('express')
// express 모듈 가져오기
const app = express()
// 새로운 app 만들기
const port = 5000
// 포트 설정

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jth9339:zheng9339@boilerplate.kfqtosn.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요lolololol')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})