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
    console.log(`planPassword: ${plainPassword}, hashedPassword: ${this.password}`);
    
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err){ return cb(err) }//에러 발생
        console.log(`isMatch: ${isMatch}`);
        cb(null,isMatch)//isMatch => true or false
    })
    /*
    bcrypt.compare(plainPassword, this.password).then(function(result){console.log(result)})
    */
}

userSchema.pre('save',async function (next) {
    try {
      if (!this.isModified('password')) return next();
  
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
  
      return next();
    } catch (error) {
      return next(error);
    }
  }
)
/*
userSchema.pre('save', function(next){
    console.log("save")
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err){return next(err)}
            bcrypt.hash(user.password, salt, function(err,hash){
                if(err){return next(err)}
                //비밀번호 hash된 비밀번호로 바꿈
                user.password = hash
                console.log(user.password)
                next()
            })
        })
    }
    next()
})
*/
userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    console.log(user);
    user.save(function(err, userInfo){
        if(err) return cb(err)
        cb(null, userInfo)
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