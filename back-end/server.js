// server.js

// [LOAD PACKAGES]
const express      = require('express');
const bodyParser   = require('body-parser'); 
const mongoose     = require('mongoose');
const cookieParser = require('cookie-parser');
const cors         = require('cors');
const fs = require('fs');

// [SETUP EXPRESS APP]
const app          = express();

// [CONFIGURE SERVER PORT]
const port = process.env.PORT || 8080;

// [initialize routes]
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api',require('./routes/api'));
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(422).send({error:err.message});
})

// [RUN SERVER]
const server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});

// [ CONFIGURE mongoose ]
const mongoURI = 'mongodb+srv://Junhyong:Junhyong@cluster0.bm9aa.mongodb.net/TeamDB?retryWrites=true&w=majority';
// CONNECT TO MONGODB SERVER
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
const conn = mongoose.createConnection(mongoURI);
mongoose.connect('mongodb+srv://Junhyong:Junhyong@cluster0.bm9aa.mongodb.net/TeamDB?retryWrites=true&w=majority', { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

// [GRIDFS STORAGE ENGINE]



const multer = require('multer');
const path = require('path');




// [SERVERSIDE UPLOAD WITH MULTER]
const Event = require('./models/events');
const Product = require('./models/products');
const AWS = require('aws-sdk');
var multerS3 = require("multer-s3");
const dotenv = require('dotenv') 
dotenv.config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY
console.log(process.env)

const S3 = require('aws-sdk/clients/s3')

const s3 = new S3({
   region,
   accessKeyId,
   secretAccessKey
  })

  const uploadS3Product = multer({
   storage: multerS3({
     s3: s3,
     bucket: bucketName,
     acl: 'public-read',
     key: function(req, file, cb) {
      cb(null, 'products/'+new Date().valueOf() + '_'+file.originalname)
     }
   })
  })

  const uploadS3Event = multer({
    storage: multerS3({
      s3: s3,
      bucket: bucketName,
      acl: 'public-read',
      key: function(req, file, cb) {
       cb(null, 'banners/'+new Date().valueOf() + '_'+file.originalname)
      }
    })
   })


app.post('/eventImg/:id', uploadS3Event.single('img'), (req, res) => {
  Event.findByIdAndUpdate(
    {_id: req.params.id}, {img: req.file.location, imgPath: req.file.location}).then(function(event){

    Event.findOne({_id: req.params.id}).then(function(event){
      console.log('successfully updated local image');
    })  
  })
});

app.post('/productImg/:id', uploadS3Event.single('img'), (req, res) => {
  Product.findByIdAndUpdate(
    {_id: req.params.id}, {img: req.file.location, imgPath: req.file.location}).then(function(product){

    Product.findOne({_id: req.params.id}).then(function(product){
      console.log('successfully updated local image');
      res.send('Success');
    })
  })
});

// mutiple product images upload below.
app.post('/productMutipleImg/:id', uploadS3Product.array('img', 5), (req, res) => {
  console.log(req.files);
  if(req.files.length !== 0){
  Product.findByIdAndUpdate(
    {_id: req.params.id}, {
      $set: {
        detailImg: [],
        detailImgPath: []
             }
    }
  ).then(function(product){
    let images = req.files
    let i = 0
    images.forEach((image) => {
      if(i !== 0 ) { 
        i++
        Product.findByIdAndUpdate(
          {_id: req.params.id}, {
            $push: {
              detailImg: image.location,
              detailImgPath: image.location
          }
            }).then(function(product){
          Product.findOne({_id: req.params.id}).then(function(product){  
            console.log('successfully updated local image');
            res.send('Success');
          })
        })
  
      } else { 
        i++
        Product.findByIdAndUpdate(
          {_id: req.params.id}, {img: image.location, imgPath: image.location}).then(function(product){
      
          Product.findOne({_id: req.params.id}).then(function(product){
            console.log('successfully updated local thumbnail image');
            res.send('Success');
          })
        })
      
      }
      
    })
  })
}
});
/*
form data로 이미지를 여러 개 (MAX: 5개) 받아 서버에 업로드. 
DB 에는 product model 의 
detailImg, detailImgPath 두 필드에 각각 파일명, 파일경로
를 배열 형태로 저장
*/


app.post('/eventImgDel', (req, res) => {
  var a = 0
  var b = Object.keys(req.body.imgPaths).length
  while(a<b){
    fs.unlink(Object.values(req.body.imgPaths)[a++], (err) => {
      if (err) {
          console.log("failed to delete local image:"+err);
      } else {
          console.log('successfully deleted local image');                                
      }
    })
  }
});
/*
{
  "imgPaths" : ["../src/assets/images/banner/image1.png",
"../src/assets/images/banner/image2.png"]
}
삭제할 이벤트의 imgPath 의 배열.
*/

app.post('/productImgDel', (req, res) => {
  var a = 0
  var b = Object.keys(req.body.imgPaths).length
  while(a<b){
    fs.unlink(Object.values(req.body.imgPaths)[a++], (err) => {
      if (err) {
          console.log("failed to delete local image:"+err);
      } else {
          console.log('successfully deleted local image');                                
      }
    })
  }
});
/*
{
  "imgPaths" : ["../src/assets/images/banner/image1.png",
"../src/assets/images/banner/image2.png"]
}
삭제할 상품의 imgPath 의 배열.
*/


//Kakao Pay API Usage

//Using https and express.
const https = require('https')

//Put your Admin Key here.
const admin_key = process.env.KAKAO_ADMIN_KEY

//Using qs for parameters.
const qs = require('qs')

//Setting headers.
const payOptions = {
  hostname: 'kapi.kakao.com',
  path: '/v1/payment/ready',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'Authorization': `KakaoAK ${admin_key}`
  }
}

const url = 'http://localhost:3000/#' //EC2 올리면 바꾸기

app.post('/pay', (req, res) => {
	console.log('call')
  const pay = https.request(payOptions, res2 => {
    res2.on('data', d => {
      res.send({ qr: JSON.parse(d).next_redirect_pc_url, tid: JSON.parse(d).tid })
    })
  })
  pay.on('error', error => {
    console.error(error)
  })
  
  pay.write(qs.stringify({
    cid: 'TC0ONETIME',
    partner_order_id: 'k_sinsa',
    partner_user_id: req.body._id,
    item_name: req.body.name,
    quantity: 1,
    total_amount: req.body.totalPrice,
    tax_free_amount: req.body.totalPrice,
    approval_url: `${url}/pay/success`,
    cancel_url: `${url}/pay/cancel`,
    fail_url: `${url}/pay/cancel`
  }))
  pay.end()
});
