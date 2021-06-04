const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create events Schema & model
const PurchaseSchema = new Schema({
user_id:{
  type:String
}, //유저 아이디 (_id)
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
product:{
    type:Array,
    _id : {type:String},
    name: {type:String},
    quantity: {type:Number},
    price: {type:Number},
    category: {type:String}
},
status: {
    type:String,
    default : "결제 중"
}, //배송 상태; 결제 중, 결제 완료, 배송 중, 배송 완료, 구매 확정
totalPrice: {
    type:Number
},//총금액
address: {
    type:String
},
username : {
  type : String
}
});


const Purchase = mongoose.model('purchase', PurchaseSchema);


module.exports = Purchase;

/*
[JSON FORMAT]

 {  
    "user_id" : "_id of user",
    "date" : "default: 현재시각",
    "product":[
               {"_id":"_id of product1","name":"여름용 나시","quantity":"1","price":"25000"},
               {"_id":"_id of product2","name":"겨울용 파카 ","quantity":"1","price":"108000"},
               {"_id":"_id of product3","name":"아동용 신발","quantity":"2","price":"39000"}
              ],
    "status":"결제 완료",
    "totalPrice": "172000"
    }
*/


/*
[
    {
      date: '2021-05-28', //형식은 자유
      product: [{
          name: '티셔츠1',
          quantity: 2, //수량
          price: 30000
        }, {
          name: '티셔츠2',
          quantity: 1,
          price: 40000
        },
        { ... }, ...
      ],
      status: '배송 중', //결제 완료, 배송 중, 배송 완료, 구매 확정
      price: 103000, //총결제금액. 주문내역 post 시 미리 계산된 상태로 프론트에서 줄거임
      rate: { 상품평 부분 }
    },
   
  ]
  */