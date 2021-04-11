const express = require('express');
const { User } = require('../models/users');
const Event = require('../models/events');
const Product = require('../models/products');
const { auth } = require('../middleware/auth');
const router = express.Router();
const path = require("path");

//role 1 관리자
//role 0 일반유저
router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
    });
});



router.post("/login", (req, res) => {
    User.findOne({ id: req.body.id }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "해당 ID가 존재하지 않습니다."
            });

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
    Event.find({}).then(function(events){
        res.send(events);
    });
});

const postEventImage = require(path.join(__dirname, "post-eventImg.js"))
router.post('/events/image/:id', postEventImage) //upload image

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

module.exports = router;