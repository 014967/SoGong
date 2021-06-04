const express = require('express');
const { User } = require('../models/users');
const Event = require('../models/events');
const Product = require('../models/products');
const Purchase = require('../models/purchases');
const { auth } = require('../middleware/auth');
const { Customerservice } = require('../models/customerservice');
const { Review } = require('../models/review');
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
    User.findOne({ _id: req.user._id },
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

장바구니 추가

{
"_id":"60a8bcb15faf4952ec13fe45",
"productId":"60a8bcb15faf4952ec13fe45",
"quantity": 5
} //예시

*/

router.post('/removeFromwishlist', auth, (req, res) => {

    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "wishlist": { "id": {$in : req.body.productIds} } }
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
                        wishlist
                    })
                })
        }
    )
})
/* 

장바구니 삭제

{
    "productIds" : ["60acfea8175cd0590036cd4e", "60acfe7d175cd0590036cd4d"]
}
productIds: 삭제할 물품id의 배열

*/

router.get("/wishlist/", auth, (req, res) => {
    User.findById({_id:req.user._id}).select('wishlist').then(function(users){
        res.send(users)  
    })
});
/*

장바구니 목록확인

get으로 http://localhost:8080/api/wishlist/productId하면 장바구니의 해당 productId, quantity, date가 조회가능

*/

router.post("/adddelivery", auth, (req, res) => {

    //먼저  User Collection에 해당 유저의 정보를 가져오기 
    User.findOne({ _id: req.user._id },
        (err, userInfo) => {

            // 가져온 정보에서 default가 true인지 확인 

            let duplicate = false;
                if (false !== req.body.default) {
                    duplicate = true;
                }

            //default가 true일 때
            if (duplicate) 
            User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        delivery: {
                            $each:[{
                            deliveryname: req.body.deliveryname,
                            name: req.body.name,
                            address: req.body.address,
                            detailaddress: req.body.detailaddress,
                            zonecode: req.body.zonecode,
                            phonenumber: req.body.phonenumber
                            }], $position: 0
                        }
                    }
                },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.status(400).json({ success: false, err })
                    res.status(200).send(userInfo.delivery)
                }
            )
            //defualt가 false일 때 
            else {
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
            }
        })
});

/*

배송지 추가

{
"_id":"60a8bcb15faf4952ec13fe45",
"default": false,
"deliveryname":"우리집1",
"name":"홍길동",
"address":"서울특별시 ~구 ~동 ~로 100",
"detailaddress":"~동 ~호",
"zonecode":"12345",
"phonenumber":"010-8282-8282"
} //예시

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
/* 

배송지 삭제

get으로  http://localhost:8080/api/removeFromdelivery?deliveryname=${deliveryname}하면 해당 deliveryname이 있는 배송지 항목 삭제

${deliveryname} = 우리집1 //예시

*/
router.patch('/delivery/:deliveryname', auth, (req, res) => {
    User.findOne({ _id: req.user._id },
            (err, userInfo) => {
    
                // 가져온 정보에서 default가 true인지 확인 
    
                let duplicate = false;
                    if (false !== req.body.default) {
                        duplicate = true;
                    }
    
                    //default가 true일 때
                    if (duplicate){
                        User.findOneAndUpdate(
                            { _id: req.user._id },
                                {
                                "$pull":
                                    { "delivery": { "deliveryname": req.params.deliveryname } }
                                },
                                { new: true }
                            ).then(function(user){
                        User.findOneAndUpdate(
                            { _id: req.user._id },
                                {
                                    $push: {
                                        delivery: {
                                            $each:[{
                                            deliveryname: req.body.deliveryname,
                                            name: req.body.name,
                                            address: req.body.address,
                                            detailaddress: req.body.detailaddress,
                                            zonecode: req.body.zonecode,
                                            phonenumber: req.body.phonenumber
                                            }], $position: 0
                                        }
                                    }
                                },
                            { new: true },
                            (err, userInfo) => {
                            if (err) return res.status(400).json({ success: false, err })
                            res.status(200).send(userInfo.delivery)
                            
                        }
                        )
                    })
                    }
                             //defualt가 false일 때 
                        else {
                            User.findOneAndUpdate(
                                { _id: req.user._id, "delivery.deliveryname": req.params.deliveryname },
                                    {
                                    $set:
                                        {
                                            "delivery.$.deliveryname": req.body.deliveryname,
                                            "delivery.$.name": req.body.name,
                                            "delivery.$.address": req.body.address,
                                            "delivery.$.detailaddress": req.body.detailaddress,
                                            "delivery.$.zonecode": req.body.zonecode,
                                            "delivery.$.phonenumber": req.body.phonenumber
                                        }
                    
                                    },
                                    { new: true },
                                    (err, userInfo) => {
                                        let delivery = userInfo.delivery;
                                        let array = delivery.map(item => {
                                        return item.deliveryname
                                        })
        
                                        User.find({ deliveryname: { $in: array } })
                                            .exec((err, userInfo) => {
                                        return res.status(200).json({
                                            delivery
                                        })
                                    })}
                                )
                            }
    })
    })
    
    /*
    
    배송지 수정
    
    patch로  http://localhost:8080/api/delivery/:deliveryname하면 해당 deliveryname이 있는 정보를 바꿀 수 있음
    :deliveryname = 우리집1  //예시
    
    {
    "default":true,
    "deliveryname":"우리집1",
    "name":"홍길동",
    "address":"서울특별시 ~구 ~동 ~로 100",
    "detailaddress":"~동 ~호",
    "zonecode":"12345",
    "phonenumber":"010-8282-8282"
    } //바꾸는 정보(예시)
    
    */

router.get("/delivery", auth, (req, res) => {
    User.findById({_id:req.user._id}).select('delivery').then(function(users){
        res.send(users)  
    })
});
/*

배송지 목록확인

get으로 http://localhost:8080/api/delivery/_id하면 유저의 배송지들을 확인 가능

*/

router.get("/deliveryname/:deliveryname", auth, (req, res) => {
    User.findOne({_id:req.user._id,"delivery.deliveryname": req.params.deliveryname}).then(function(users){
            if(!users){res.send(false);}
            else res.send(true) 
        })
});
/*

배송지 이름 중복확인

get으로 http://localhost:8080/api/deliveryname/우리집11 하면 로그인한 유저의 배송지 중 우리집11이라는 이름의 배송지가 있는지 확인해줌

*/

// [USER API]

router.get('/users', function(req, res){
    User.find({}).then(function(users){
        res.send(users);
    });
});

router.get('/users/:id', function(req, res){
    User.find({id:req.params.id}).then(function(users){
        if(users.length == 0)
        {
            res.send(false);
        }
        else 
        {
            console.log(users)
            res.send(users)
        }
    });
});

router.get('/usersEmail/:email', function(req, res){
    User.find({email:req.params.email}).then(function(users){
        if(users.length == 0){res.send(false);}
        else res.send(true)
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
        res.send(events);
    });
}); //event를 불러옴 (최신순)

router.get('/eventsAvailable', function(req, res){
    Event.find({}).sort({date: -1}).then(function(events){
            let date = new Date();
            const regDate = date => date.split('.')[0].replace('T', '').replace('-', '').replace('-', '').replace(':', '').replace(':', '')
            const regDate2 = date => `${date.getFullYear()}${date.getMonth() < 9 ? 0 : ''}${date.getMonth() + 1}${date.getDate() < 9 ? 0 : ''}${date.getDate()}${date.getHours() < 9 ? 0 : ''}${date.getHours()}${date.getMinutes() < 9 ? 0 : ''}${date.getMinutes()}${date.getSeconds() < 9 ? 0 : ''}${date.getSeconds()}`

            events.forEach((event) => {
                if (regDate2(date) > regDate(event.due)){
                    Event.updateOne({_id: event._id}, {available : false}).then(() =>{console.log('changed available')})
                    
                }
            }) // 현재시각과 비교해 이벤트를 활성화 / 비활성화함
    })
    .then(() => {res.send("available events checked")})
})


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
          res.send('successfully updated unavailable events');                                  
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
    .skip( (page-1) * 5 )
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

router.get('/products/:id', function(req, res){
    Product.find({_id:req.params.id}).then(function(product){
        res.send(product)
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


router.post('/products/sortedPage', function(req, res){
    let page = req.body.page
    if(page == 1) Product.find({'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}, available : true}).sort({price: req.body.order})
    .limit(10)
   .then(function(product){
        res.send(product);
    });

    if(page!=1) Product.find({'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}, available : true}).sort({price: req.body.order})
    .skip( (page-1) * 10 )
    .limit(10)
   .then(function(product){
        res.send(product);
    });
});

router.post('/products/unsortedPage', function(req, res){


    if(req.body.page == 1) Product.find({'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}, available : true}).sort({date: -1})
    .limit(10)
   .then(function(product){
        res.send(product)
    });

    if(req.body.page!=1) Product.find({'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}, available : true}).sort({date: -1})
    .skip( (req.body.page-1) * 10 )
    .limit(10)
   .then(function(product){
        res.send(product)

    });
});



router.post('/products/sorted', function(req, res){
    let page = req.body.page
    if(page == 1) Product.find({'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}, available : true}).sort({price: req.body.order})
   .then(function(product){
        res.send(product);
    });

    if(page!=1) Product.find({'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}, available : true}).sort({price: req.body.order})
   .then(function(product){
        res.send(product);
    });
});

router.post('/products/sortedPage', function(req, res){
    let page = req.body.page
    if(page == 1) Product.find({'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}, available : true}).sort({price: req.body.order})
    .limit(10)
   .then(function(product){
        res.send(product);
    });

    if(page!=1) Product.find({'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}, available : true}).sort({price: req.body.order})
    .skip( (page-1) * 10 )
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


    if(req.body.page == 1) Product.find({'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}, available : true}).sort({date: -1})
   .then(function(product){
        res.send(product)
    });

    if(req.body.page!=1) Product.find({'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}, available : true}).sort({date: -1})
   .then(function(product){
        res.send(product)

    });
});

router.post('/products/unsortedPage', function(req, res){
    
    
    if(req.body.page == 1) Product.find({'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}, available : true}).sort({date: -1})
    .limit(10)
   .then(function(product){
        res.send(product)
    });

    if(req.body.page!=1) Product.find({'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}, available : true}).sort({date: -1})
    .skip( (req.body.page-1) * 10 )
    .limit(10)
   .then(function(product){
        res.send(product)

    });
});
/* [ JSON FORMAT of request to '/products/unsorted' ]
{
    "search": "string",
    "min": "0",
    "max": "1000000",
    "page" : "1"
}
page: 페이지 limit(n) n= 한페이지에 표시할 개수
*/

router.post('/products/sorted/:category', function(req, res){
    let page = req.body.page
    console.log(req.params.category)
    if(page == 1) Product.find({'category' : req.params.category, 'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}, available : true}).sort({price: req.body.order})
    .limit(10)
   .then(function(product){
        res.send(product);
    });

    if(page!=1) Product.find({'category' : req.params.category, 'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}, available : true}).sort({price: req.body.order})
    .skip( (page-1) * 10 )
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
    
    
    if(req.body.page == 1) Product.find({category: req.params.category,'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}, available : true}).sort({date: -1})
    .limit(10)
   .then(function(product){
        res.send(product);
    });

    if(req.body.page!=1) Product.find({category: req.params.category,'name': {'$regex': req.body.search,'$options': 'i' },
    price:{"$gte":req.body.min,"$lte":req.body.max}, available : true}).sort({date: -1})
    .skip( (req.body.page-1) * 10 )
    .limit(10)
   .then(function(product){
        res.send(product);
    });
});

/* [ JSON FORMAT of request to '/products/unsorted/:category' ]
{
    "search": "string",
    "min": "0",
    "max": "1000000",
    "page" : "1"
}
search: 해당 단어를 포함.(빈칸이면 모두 검색)
min, max : 가격 범위 (빈칸이거나 누락되어선 안됨)
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

router.post('/products/unavailable', function(req, res){
    var a = 0
  var b = Object.keys(req.body.productIds).length
  while(a<b){
    Product.findByIdAndUpdate({_id: Object.values(req.body.productIds)[a++]},  { available: false } ,(err) => {
      if (err) {
          console.log("failed to update:"+err);
      } else {
          console.log('successfully updated unavailable products');
          res.send('successfully updated unavailable products');                               
      }
    })
  }
});
    /* [ JSON FORMAT of request to '/products/unavailable' ]
{
    "productIds" : ["116t4sdfi0315", "013532hf8dsa093"]
}
productIds: 비활성화할 상품id의 배열
*/



router.post('/addcustomQuestion', auth, function(req, res, next){
    Customerservice.create(req.body).then(function(customerservice){
     res.send(customerservice);
    }).catch(next);
 });

/*

유저 고객 문의 등록

{
id:"user의 _id",
title:"문의 제목",
contents:"문의 내용",
orderlist:주문내역들,
} //예시

*/

router.get('/user/customerquestion/:orderlist', auth, function(req, res){
    Customerservice.find({orderlist:req.params.orderlist}).then(function(customerservice){
        res.send(customerservice);
    });
});

/*

유저 자신의 고객 문의 목록 조회

*/


router.patch('/admin/Answer/:_id', auth, (req, res) => {

    Customerservice.findOneAndUpdate(
        {_id: req.params._id },
            {
            $set:
                {
                    "answer": req.body.answer,
                }    
                },
                { new: true },
            ).then(function(customerservice){
                Customerservice.findOne({_id: req.params._id}).then(function(customerservice){
                    res.send(customerservice);
                })
            })
})

/*

관리자의 고객 문의 답변 등록

{
    answer:"~"
} //예시

*/

router.get('/admin/customerquestion', auth, function(req, res){
    Customerservice.find({}).then(function(customerservice){
        res.send(customerservice);
    });
});

/*

관리자 고객 문의 목록들 조회

*/

router.post('/addreview', auth, function(req, res, next){
    Review.create(req.body).then(function(review){
     res.send(review);
    }).catch(next);
 });

router.post('/addreviewBypurchase', function(req, res){
    const arr = []
    req.body.reviews.forEach((r, i) => {
        Review.create(r).then(function(review, err){
            arr[i] = review
            if(i === req.body.reviews.length-1) {console.log("sucs"); res.send(arr)}
        })
    })
})

/*

유저 고객 문의 등록

{
    productId: "product의 _id"
    userId: "user의 _id"
    recommend: "추천"
    deliveryrating: "매우빠름"
    score: 5
    comment: "넘모좋아"
} //예시

*/

router.get('/product/review/:product_id', function(req, res){
    Review.find({productId:req.params.product_id}).then(function(review){
        res.send(review);
    });
});

/*

해당 product의 reviw들 보기

*/

router.get('/admin/product/review/:product_id/:user_id', auth, function(req, res){
    Review.find({productId:req.params.product_id,userId:req.params.user_id}).then(function(review){
        res.send(review);
    });
});

/*

관리자가 상품명 버튼을 누르면 사용자가 남긴 상품평을 확인할 수 있음

*/

router.get('/admin/product/review/:purchase_id', auth, function(req, res){
    console.log(req.params),
    Review.find({purchaseId:req.params.purchase_id}).then(function(reviews){
        res.send(reviews);
    });
});

/*
특정 구매내역에 해당하는 상품평들을 get
*/


router.get('/product/review/avgscore/:product_id', function(req, res){

    Review.aggregate([
        {$match:{productId:req.params.product_id}},
        {$group:{_id:req.params.product_id,avg:{$avg:"$score"}}}
        ]).then(function(data){
        res.send(data);
    });
});
/*

product의 평점을 구함

*/


// 구매 목록을 get 또는 post
router.get('/purchases', function(req, res){
    Purchase.find({}).then(function(purchases){
        res.send(purchases.filter(purchase => purchase.status !== '결제 중'));
    });
});

router.get('/purchases/:id', function(req, res){
    Purchase.find({_id : req.params.id, status:{$not: /^결제 중.*/}}).then(function(purchase){
        res.send(purchase);
    });
});


router.get('/purchases/User/:id', function(req, res){
    Purchase.find({user_id : req.params.id, status:{$not: /^결제 중.*/}}).then(function(purchases){
        res.send(purchases);
    });
});


router.post('/purchasesById', function(req, res){
    Purchase.find({_id:{$in: req.body.purchase_ids}}).then(function(purchases){
        res.send(purchases); 
    })
});
/*  [ JSON FORMAT of request to '/purchaseById' ]
 {
    "purchase_ids" : "["1414214124", "1412214124"]"
 }
*/

router.post('/purchases', function(req, res, next){
    Purchase.create(req.body).then(function(purchase){
     res.send(purchase);
    }).catch(next);
 });
/*  [ JSON FORMAT of request to '/purchases' ]
 {  
    "user_id" : "_id of user",
    "date" : "default: 현재시각",
    "product":[
               {"_id":"_id of product1","name":"여름용 나시","quantity":"1","price":"25000","category":"Men"},
               {"_id":"_id of product2","name":"겨울용 파카 ","quantity":"1","price":"108000","category":"Men"},
               {"_id":"_id of product3","name":"아동용 신발","quantity":"2","price":"39000","category":"Child"}
              ],
    "status":"결제 완료",
    "totalPrice": "172000",
    "address": "서울시노원구공릉동"
    }
*/

// 구매내역의 status 변경
router.post('/purchaseStatus/:id', function(req, res, next){
    Purchase.findByIdAndUpdate({_id:req.params.id}, {status:req.body.status}).then(function(purchase){
        if (req.body.isWishList === 'true') {
            User.findByIdAndUpdate({_id:purchase.user_id}, {$set:{wishlist: []}})
                .then(function(purchase){
                    Purchase.findOne({_id:req.params.id}).then(function(purchase){
                        res.send(purchase.status)
                    })
            })
        } else {
            Purchase.findOne({_id:req.params.id})
                .then(function(purchase){
                    res.send(purchase.status)
                })
        }  
    })
 });
/*  [ JSON FORMAT of request to '/purchaseStatus/:id' ]
 {  
    "status" : "결제 완료",
    "isWishList" : "false"
 }
*/


//Kakao Pay API Usage

//Using https and express.
const https = require('https')
const dotenv = require('dotenv') 
dotenv.config()

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

router.post('/pay', (req, res) => {
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


module.exports = router;