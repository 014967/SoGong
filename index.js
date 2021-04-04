// app.js

// [LOAD PACKAGES]
const express     = require('express');
const bodyParser  = require('body-parser'); 
const mongoose    = require('mongoose');

// [SETUP EXPRESS APP]
const app         = express();

// [CONFIGURE SERVER PORT]
const port = process.env.PORT || 8080;

// [initialize routes]
app.use(express.json());
app.use('/api',require('./routes/api'));
app.use((err,req,res,next)=>{
    //console.log(err);
    res.status(422).send({error:err.message});
})

// [RUN SERVER]
const server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});

// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb+srv://Junhyong:Junhyong@cluster0.bm9aa.mongodb.net/TeamDB?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.Promise = global.Promise;