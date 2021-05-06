const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create products Schema & model
const ProductSchema = new Schema({
productNo:{
    type:Number,
},//상품번호
name:{
    type:String,
    required: [true]
},//상품명
detail:{
    type:String,
    required: [true]
},//상세정보
img: {
    type:String
}, //이미지
price: {
    type:Number,
    required: [true]
},//가격
stock:{
    type:Number,
},//수량
token:{
    type: Boolean,
    default: 0
}//체크박스 선택 여부
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
/*
[JSON FORMAT]

{
"productNo":"1",
"name":"product name",
"detail":"product detail",
"img":"link of image",
"stock":"50",
"price":"35000",
"token":"0"
}

*/