const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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

userSchema.pre('save' , function(next){
    var user = this;

    if(user.isModified('password')){
    //비밀번호를 암호화 시킴
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err)
            user.password = hash
            next()
            // Store hash in your password DB.
        })
    })
    }else{
        next()
    }
})


userSchema.methods.comparePassword = function(plainPassword, cb){
 //plainPassword 1234567 암호화된 비밀번호 (해쉬)와 맞는지 체크 필요
 bcrypt.compare(plainPassword, this.password, function(err, isMatch){
    if(err) return cb(err)
    cb(null, isMatch)
 })
}

userSchema.methods.generateToken = function(cb){

    var user = this;
    //jsonwebToken을 활용해서 토큰 생셩
    var token = jwt.sign(user._id.toHexString(),'secretToken')

    // user._id + 'secretToken' = token

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }