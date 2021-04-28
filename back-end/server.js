// server.js

// [LOAD PACKAGES]
const express      = require('express');
const bodyParser   = require('body-parser'); 
const mongoose     = require('mongoose');
const cookieParser = require('cookie-parser');
const cors         = require('cors');

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
    //console.log(err);
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
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream')
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');

 let gfs;
 conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
  });

  // Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });

  const upload = multer({ storage });

 
app.post('/upload', upload.single('file'), (req, res) => {
    // res.json({ file: req.file });
    res.redirect('/');
  });
  
  
  app.get('/upload', (req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
  
      // Files exist
      return res.json(files);
    });
  });

 
app.get('/upload/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      // File exists
      return res.json(file);
    });
  });

  app.get('/upload64/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      // File exists
      const readstream = gfs.createReadStream(file.filename);
      
      const bufs = [];
      readstream.on('data', function (chunk) {
        bufs.push(chunk);
      });
      readstream.on('end', function () {
        const fbuf = Buffer.concat(bufs);
        const base64 = fbuf.toString('base64');
        return res.json(base64);
      });
      
    });
  });


  
  
  app.get('/upload/display/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
  
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
  });
  
  
  app.delete('/upload/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
  
      res.redirect('/');
    });
  });
  