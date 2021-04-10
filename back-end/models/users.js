const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema;

//create users Schema & model
const UserSchema = new Schema({
id:{
    type:String,
    required: [true]
},
password: {
    type:String,
    minlegth:5,
    required: [true]
},
name: {
    type:String,
    required: [true]
},
email:{
    type:String,
    required: [true]
},
token:{
    type:Boolean,
    default: false
},//로그인했는지 여부
rule:{
    type:Boolean,
    default: false
},//관리자계정인지 여부
plist:{
    type:Array
},
wishlist:{
    type:Array
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

const User = mongoose.model('user', UserSchema);


module.exports = User;

/*
[JSON FORMAT]

{
"id":"test_user01",
"pw":"test_user01_pw",
"name":"홍길동",
"email":"test_user01@naver.com"
"plist":"[1,2,3]"
"wishlist":"[4,5,6]"
}
*/