const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create events Schema & model
const EventSchema = new Schema({
title:{
    type:String,
    required: [true]
},
detail:{
    type:String,
    required: [true]
},
available: {
    type:Boolean,
    default: true
}, //활성화,비활성화
due: {
    type:String,
    required: [true]
},//유효기간
date:{
    type:Date,
    default: k_date = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let today = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let milliseconds = date.getMilliseconds();
    return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}
},//업로드날짜
images:{
    type: Array,
    default: []
},//원본이미지
thumbnail:{
    type:String, 
},//썸네일
token:{
    type:Boolean,
    default: false
},//체크박스 선택여부
bannerNo:{
    type: Number,
    default: 0
}//배너 보여지는 차례 배너에띄우지않을경우 0
}, { timestamps: true });

const Event = mongoose.model('event', EventSchema);


module.exports = { Event };

/*
[JSON FORMAT]

{
"title":"test_event01",
"detail":"test_event01_details",
"available":"true",
"due": "2021-06-25T23:59:59" ,
"date":"",
"img":"link_of_image",
"thumbnail":"link_of_thumbnail_image",
"token":"false",
"bannerNo":"1"
}

*/