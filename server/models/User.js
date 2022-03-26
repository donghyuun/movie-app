const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 15
    },
    email:{
        type: String,
        trim: true,//공백제거
        unique: 1//이메일 중복 방지
    },
    password:{
        type: String,
        minlength: 5,
    },
    role:{
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //여기서 this는 email로 db에서 찾은 유저를 말함
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err){ return cb(err) }//에러 발생
        cb(null,isMatch)//isMatch => true or false
    })
}

userSchema.methods.generateToken = function(cb){
    let user = this;
    console.log(user);
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //user._id + ' ' => token
    jwt.verify(token, 'secretToken', function(err, decoded){
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err)return cb(err)
            cb(null, user)
        })
    })
}
const User = mongoose.model('User', userSchema)
module.exports = {User}