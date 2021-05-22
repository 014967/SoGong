const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create products Schema & model
const ProductSchema = new Schema({
productNo:{
    type:Number,
    default:0
},//상품번호
category:{
    type:String,
    required : [true]
},// 카테고리
name:{
    type:String,
    required: [true]
},//상품명
detail:{
    type:String,
    required: [true]
},//상세정보
img: {
    type:String,
    
}, //이미지
imgPath: {
    type:String,
    
}, //이미지경로
price: {
    type:Number,
    required: [true]
},//가격
stock:{
    type:Number,
    required: [true]
},//수량
token:{
    type: Boolean,
    default: 0
},//체크박스 선택 여부
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
}
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
/*
[JSON FORMAT]

{
"productNo":"1",
"category":"category01",
"name":"product name",
"detail":"product detail",
"img":"link of image",
"stock":"50",
"price":"35000",
"token":"0"
}

*/