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
    default : 'no image'
    
}, //이미지
imgPath: {
    type:String,
    default : 'no image'
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
},
available:{
    type:Boolean,
    default:true

},
detailImg:{
    type:Array,
    default:[]

},
detailImgPath:{
    type:Array,
    default:[]
},
deliveryFee:{
    type:Number,
    default:0
}
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
/*
[JSON FORMAT]

{
"productNo":"0",
"category":"category01",
"name":"product name",
"detail":"product detail",
"stock":"50",
"price":"35000",
"deliveryFee":"2500"
"token":"0"
}

*/