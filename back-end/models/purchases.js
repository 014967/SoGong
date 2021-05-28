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
    name: { type:String},
    quantity: { type:Number},
    price: {type:Number}
},
status: {
    type:String
}, //배송 상태; 결제 완료, 배송 중, 배송 완료, 구매 확정
totalPrice: {
    type:Number
},//총금액
rateString:{
    type:String
},//평가 내용(글)
rateScore:{
    type:Number
}// 평가 점수(별점)
});

const Purchase = mongoose.model('purchase', PurchaseSchema);


module.exports = Purchase;

/*
[JSON FORMAT]

{
"title":"특가세일이벤트",
"detail":"특가세일",
"available":"true",
"due": "2021-06-25T23:59:59" ,
"token":"false",
"bannerNo":"0"
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