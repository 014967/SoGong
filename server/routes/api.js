const express = require('express');
const User = require('../models/users');
const Event = require('../models/events');
const router = express.Router();

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

// [EVENT API]
router.get('/events', function(req, res){
    Event.find({}).then(function(event){
        res.send(event);
    });
});

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

module.exports = router;