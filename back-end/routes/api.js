const express = require('express');
const { User } = require('../models/users');
const Event = require('../models/events');
const Product = require('../models/products');
const { auth } = require('../middleware/auth');
const router = express.Router();
const path = require("path");


// [ Initial connect back to front ]

router.get('/', (req, res)=>{
    console.log("back-end initialized")
    res.send('back-end initialized')
  });

  

//role 1 관리자
//role 0 일반유저
router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.rule === 1 ? true : false,
        isAuth: true,
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
    });
});



router.post("/login", (req, res) => {
    User.findOne({ id: req.body.id }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "해당 ID가 존재하지 않습니다."
            });
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "패스워드가 틀렸습니다." });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id, accessToken: user.token
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

//id=123123123,324234234,324234234  type=array
router.get('/products_by_id', (req, res) => {

    let type = req.query.type
    let productIds = req.query.id

    if (type === "array") {
        //id=123123123,324234234,324234234 이거를 
        //productIds = ['123123123', '324234234', '324234234'] 이런식으로 바꿔주기
        let ids = req.query.id.split(',')
        productIds = ids.map(item => {
            return item
        })

    }

    //productId를 이용해서 DB에서  productId와 같은 상품의 정보를 가져온다.

    Product.find({ _id: { $in: productIds } })
    
        .exec((err, product) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(product)
        })

})

router.post("/addTowishlist", auth, (req, res) => {

    //먼저  User Collection에 해당 유저의 정보를 가져오기 
    User.findOne({ _id: req.body._id },
        (err, userInfo) => {

            // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인 

            let duplicate = false;
            userInfo.wishlist.forEach((item) => {
                if (item.id === req.body.productId) {
                    duplicate = true;
                }
            })

            //상품이 이미 있을때
            if (duplicate) {
                User.findOneAndUpdate(
                    { _id: req.user._id, "wishlist.id": req.body.productId},
                    { $inc: { "wishlist.$.quantity" : req.body.quantity } },
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.status(200).json({ success: false, err })
                        res.status(200).send(userInfo.wishlist)
                    }
                )
            }
            //상품이 이미 있지 않을때 
            else {
                User.findOneAndUpdate(
                    { _id: req.user._id },
                    {
                        $push: {
                            wishlist: {
                                id: req.body.productId,
                                quantity: req.body.quantity,
                                date: Date.now()
                            }
                        }
                    },
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.status(400).json({ success: false, err })
                        res.status(200).send(userInfo.wishlist)
                    }
                )
            }
        })
});
/*
{
"_id":"60a8bcb15faf4952ec13fe45",
"productId":"60a8bcb15faf4952ec13fe45",
"quantity": 5
}
*/

router.get('/removeFromwishlist', auth, (req, res) => {

    //먼저 cart안에 내가 지우려고 한 상품을 지워주기 
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "wishlist": { "id": req.query.id } }
        },
        { new: true },
        (err, userInfo) => {
            let wishlist = userInfo.wishlist;
            let array = wishlist.map(item => {
                return item.id
            })

            Product.find({ _id: { $in: array } })
                .exec((err, userInfo) => {
                    return res.status(200).json({
                        userInfo,
                        delivery
                    })
                })
        }
    )
})
// get으로  http://localhost:8080/api/removeFromwishlist?id=${productId}하면 해당 productId가 있는 장바구니 항목 삭제

router.get("/wishlist/:id", auth, (req, res) => {
    User.findById({_id:req.params.id}).select('wishlist').then(function(users){
        res.send(users)  
    })
});

router.post("/adddelivery", auth, (req, res) => {

    User.findOne({ _id: req.body._id },

                User.findOneAndUpdate(
                    { _id: req.user._id },
                    {
                        $push: {
                            delivery: {
                                deliveryname: req.body.deliveryname,
                                name: req.body.name,
                                address: req.body.address,
                                detailaddress: req.body.detailaddress,
                                zonecode: req.body.zonecode,
                                phonenumber: req.body.phonenumber
                            }
                        }
                    },
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.status(400).json({ success: false, err })
                        res.status(200).send(userInfo.delivery)
                    }
                )
        )
});
/*
{
"_id":"60a8bcb15faf4952ec13fe45",
"deliveryname":"우리집1"
"name":"홍길동",
"address":"서울특별시 ~구 ~동 ~로 100",
"detailaddress":"~동 ~호",
"zonecode":"12345",
"phonenumber":"010-8282-8282"
}
*/

router.get('/removeFromdelivery', auth, (req, res) => {

    //먼저 delivery안에 내가 지우려고 한 배송지을 지워주기 
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "delivery": { "deliveryname": req.query.deliveryname } }
        },
        { new: true },
        (err, userInfo) => {
            let delivery = userInfo.delivery;
            let array = delivery.map(item => {
                return item.deliveryname
            })

            Product.find({ _id: { $in: array } })
                .exec((err, userInfo) => {
                    return res.status(200).json({
                        userInfo,
                        delivery
                    })
                })
        }
    )
})
// get으로  http://localhost:8080/api/removeFromdelivery?deliveryname=${deliveryname}하면 해당 deliveryname이 있는 주소 항목 삭제
// ${deliveryname} = 우리집1

// [USER API]

router.get('/users', function(req, res){
    User.find({}).then(function(users){
        res.send(users);
    });
});

router.post('/users', function(req, res, next){
    User.create(req.body).then(function(user){
     res.send(user);
    }).catch(next);
 });

router.put('/users/:id', function(req, res){
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(user){
        User.findOne({_id: req.params.id}).then(function(user){
            res.send(user); 
        })
        
    })
});

router.delete('/users/:id', function(req, res){
    User.findByIdAndRemove({_id: req.params.id}).then(function(user){
        res.send(user);
        });
    
});


// [EVENTS API]
router.get('/events', function(req, res){
    Event.find({}).sort({date: -1}).then(function(events){
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth();
            let today = date.getDate();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            let milliseconds = date.getMilliseconds();
            let currentTime = new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds))
            const regDate = date => date.split('.')[0].replace('T', '').replace('-', '').replace('-', '').replace(':', '').replace(':', '')
            const regDate2 = date => `${date.getFullYear()}${date.getMonth() < 9 && 0}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
            

            events.forEach((event) => {
                if (regDate2(currentTime) > regDate(event.due)){
                    Event.findByIdAndUpdate({_id: event._id}, {available : false} ).then(function(events){
                        Event.find({}).sort({date: -1}).then(function(events){
                            res.send(events);
                        })
                    })
                }
            })
        }
        );
});

const postEventImage = require(path.join(__dirname, "post-eventImg.js"))
router.post('/events/image/:id', postEventImage) //upload image by formidable

router.post('/events', function(req, res, next){
    Event.create(req.body).then(function(event){
    res.send(event);
   }).catch(next);
});

router.put('/events/:id', function(req, res){
    Event.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(event){
        Event.findOne({_id: req.params.id}).then(function(event){
            res.send(event); 
        })
        
    })
});

router.delete('/events/:id', function(req, res){
    Event.findByIdAndRemove({_id: req.params.id}).then(function(event){
        res.send(event);
        });
    
});

router.post('/events/delete', function(req, res){
    Event.deleteMany(
        {
        _id : {
                $in: req.body.eventIds
              }
        }).then(function(event){
        res.send(event);
        });
    });
    /* [ JSON FORMAT of request to '/events/delete' ]
{
    "eventIds" : ["116t4sdfi0315", "013532hf8dsa093"]
}
eventIds: 삭제할 이벤트id의 배열
*/

router.post('/events/available', function(req, res){
    var a = 0
  var b = Object.keys(req.body.eventIds).length
  while(a<b){
    Event.findByIdAndUpdate({_id: Object.values(req.body.eventIds)[a++]},  { available: true } ,(err) => {
      if (err) {
          console.log("failed to update:"+err);
      } else {
          console.log('successfully updated available events');                                
      }
    })
  }
});
   /* [ JSON FORMAT of request to '/events/available' ]
{
    "eventIds" : ["116t4sdfi0315", "013532hf8dsa093"]
}
eventIds: 활성화할 이벤트id의 배열
*/

router.post('/events/unavailable', function(req, res){
    var a = 0
  var b = Object.keys(req.body.eventIds).length
  while(a<b){
    Event.findByIdAndUpdate({_id: Object.values(req.body.eventIds)[a++]},  { available: false } ,(err) => {
      if (err) {
          console.log("failed to update:"+err);
      } else {
          console.log('successfully updated unavailable events');                                
      }
    })
  }
});
   /* [ JSON FORMAT of request to '/events/unavailable' ]
{
    "eventIds" : ["116t4sdfi0315", "013532hf8dsa093"]
}
eventIds: 비활성화할 이벤트id의 배열
*/

router.post('/events/sorted', function(req, res){
    let page = req.body.page
    if(page == 1) Event.find({'title': {'$regex': req.body.search,'$options': 'i' }})
    .sort({date: -1})
    .limit(5)
   .then(function(event){
        res.send(event);
    });

    if(page!=1) Event.find({'title': {'$regex': req.body.search,'$options': 'i' }})
    .sort({date: -1})
    .skip( (page-1) * 5 - 1 )
    .limit(5)
   .then(function(event){
        res.send(event);
    });
});


/* [ JSON FORMAT of request to '/events/sorted' ]
{
    "search" : "string",
    "page" : "1"
}
search : 검색할 키워드
page: 페이지 limit(n) n= 한페이지에 표시할 개수
*/



// [PRODUCTS API]
router.get('/products', function(req, res){
    Product.find({}).then(function(product){
        res.send(product);
    });
});



router.post('/products', function(req, res, next){
    Product.create(req.body).then(function(products){
    res.send(products);
   }).catch(next);
});

router.put('/products/:id', function(req, res){
    Product.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(product){
        Product.findOne({_id: req.params.id}).then(function(product){
            res.send(product); 
        })
        
    })
});

router.delete('/products/:id', function(req, res){
    Product.findByIdAndRemove({_id: req.params.id}).then(function(product){
        res.send(product);
        });
    
});



router.post('/products/sorted', function(req, res){
    let page = req.body.page
    if(page == 1) Product.find({'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}}).sort({price: req.body.order})
    .limit(10)
   .then(function(product){
        res.send(product);
    });

    if(page!=1) Product.find({'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}}).sort({price: req.body.order})
    .skip( (page-1) * 10 - 1 )
    .limit(10)
   .then(function(product){
        res.send(product);
    });
});
/*
 JSON FORMAT of request to '/products/sorted'

{
    "search": "string",
    "min": "0",
    "max": "1000000",
    "order": "asc",
    "page" : "1"
}

search: 해당 단어를 포함.(빈칸이면 모두 검색)
min, max : 가격 범위 (빈칸이거나 누락되어선 안됨)
order : 오름차순=asc 내림차순=-1
page : 1페이지당 20개씩. 2면 21~40번 3이면 41~60 ....
Users.find().skip(10).limit(5) // 11~15번째 사람 쿼리
*/





router.post('/products/unsorted', function(req, res){
    
    
    if(req.body.page == 1) Product.find({category: req.body.category}).sort({date: -1})
    .limit(10)
   .then(function(product){
        res.send(product);
    });

    if(req.body.page!=1) Product.find({category: req.body.category}).sort({date: -1})
    .skip( (req.body.page-1) * 10 - 1 )
    .limit(10)
   .then(function(product){
        res.send(product);
    });
});

/* [ JSON FORMAT of request to '/products/unsorted' ]
{
    "page" : "1"
}
page: 페이지 limit(n) n= 한페이지에 표시할 개수
*/

router.post('/products/sorted/:category', function(req, res){
    let page = req.body.page
    console.log(req.params.category)
    if(page == 1) Product.find({'category' : req.params.category, 'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}}).sort({price: req.body.order})
    .limit(10)
   .then(function(product){
        res.send(product);
    });

    if(page!=1) Product.find({'category' : req.params.category, 'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}}).sort({price: req.body.order})
    .skip( (page-1) * 10 - 1 )
    .limit(10)
   .then(function(product){
        res.send(product);
    });
});
/*
 JSON FORMAT of request to '/products/sorted/:category'

 
{
    "search": "string",
    "min": "0",
    "max": "1000000",
    "order": "asc",
    "page" : "1"
}

search: 해당 단어를 포함.(빈칸이면 모두 검색)
min, max : 가격 범위 (빈칸이거나 누락되어선 안됨)
order : 오름차순=asc 내림차순=-1
page : 1페이지당 20개씩. 2면 21~40번 3이면 41~60 ....
Users.find().skip(10).limit(5) // 11~15번째 사람 쿼리
*/





router.post('/products/unsorted/:category', function(req, res){
    
    
    if(req.body.page == 1) Product.find({category: req.params.category}).sort({date: -1})
    .limit(10)
   .then(function(product){
        res.send(product);
    });

    if(req.body.page!=1) Product.find({category: req.params.category}).sort({date: -1})
    .skip( (req.body.page-1) * 10 - 1 )
    .limit(10)
   .then(function(product){
        res.send(product);
    });
});

/* [ JSON FORMAT of request to '/products/unsorted/:category' ]
{
    "page" : "1"
}
page: 페이지 limit(n) n= 한페이지에 표시할 개수
*/


router.post('/products/delete', function(req, res){
    Product.deleteMany(
        {
        _id : {
                $in: req.body.productIds
              }
        }).then(function(product){
        res.send(product);
        });
    });
    /* [ JSON FORMAT of request to '/products/delete' ]
{
    "productIds" : ["116t4sdfi0315", "013532hf8dsa093"]
}
productIds: 삭제할 상품id의 배열
*/

module.exports = router;