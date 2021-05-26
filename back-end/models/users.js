const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');
const Schema = mongoose.Schema;

//create users Schema & model
const UserSchema = new Schema({
id:{
    type:String,
    unique:1,
    required: [true]
},
password: {
    type:String,
    required: [true]
},
name: {
    type:String,
    required: [true]
},
email:{
    type:String,
    unique:1,
    required: [true]
},
token:{
    type:String,
}, // 유저가 로그인시 토큰 발급
tokenExp: {
    type: Number
}, // 토큰의 유효시간
rule:{
    type: Number,
    default: 0
}, // 관리자 : 1, 일반유저 : 0
plist:{
    type:Array
},
wishlist:{
    type:Array,
    default:[]
},
delivery:{
    type:Array,
    default:[]
}
});


UserSchema.pre("save", function (next) {
    var user = this; // User모델자체를 가르킴

    // isModified: password가 변경될때
    if (user.isModified("password")) {
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });

    } else {
        next();
    }
}); 

UserSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

UserSchema.methods.generateToken = function(cb) {
    var user = this;
    // console.log('user._id', user._id)

    // jsonwebtoken을 이용해서 token을 생성하기
    var token =  jwt.sign(user._id.toHexString(),'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

UserSchema.statics.findByToken = function(token, cb){
    var user = this;
    
    // decode token
    jwt.verify(token, 'secret', function(err,decoded){
        // 유저 아이디를 이용하여 유저를 찾은 다음에
        // 클라이언트에서 가져온 token 과 db 의 token 이 일치하는 지 확인

        user.findOne({"_id" : decoded, "token" : token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}


const User = mongoose.model('user', UserSchema);


module.exports = { User }
/*
[JSON FORMAT]

{
"id":"test_user01",
"pw":"test_user01_pw",
"name":"홍길동",
"email":"test_user01@naver.com"
"plist":["1","2","3"]
"wishlist":["4","5","6"]
}
*/