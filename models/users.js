const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create users Schema & model
const UserSchema = new Schema({
id:{
    type:String,
    required: [true]
},
pw: {
    type:String,
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
}//관리자계정인지 여부
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
}
*/