const express = require('express');
const User = require('../models/users');
const Event = require('../models/events');
const Product = require('../models/products');
const router = express.Router();
const path = require("path");

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
router.post('/events/post/:id', postEventImage) //upload image


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