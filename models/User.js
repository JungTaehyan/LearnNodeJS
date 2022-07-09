const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true, //문자가 들어올때 빈칸이 있으면 자동으로 합침
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { //회원 혹은 관리자를 설정함
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type:Number //토큰 유효기간
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }