const formidable = require("formidable")
const detect = require("detect-file-type")
const {v1: uuidv1} = require("uuid")
const fs = require("fs")
const path = require("path")
const Event = require('../models/events');




//  [post event image by postman, key = img]



module.exports = (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files)=>{
        if(err){return res.send("error in file")}
       // console.log(`name: ${fields.name}`)
       // console.log(files.img.name)
       // console.log(files.img.path)
        detect.fromFile(files.img.path, (err, result)=>{
            //console.log(result)
            // console.log(imgName)
            const imgName = files.img.name
            const allowedImageTypes = ["jpg","jpeg","png"]
           if( ! allowedImageTypes.includes(result.ext) ){
               return res.send("Image not allowed")
           }
           const oldPath = files.img.path
           const newPath = path.join(__dirname,"..","..","src","assets","images", imgName)
           
           fs.copyFile(oldPath, newPath, (err) => {
            if (err) {console.log("cannot copy file"); return;}
            
            Event.findByIdAndUpdate(
                {_id: req.params.id}, {img: imgName}).then(function(event){
                Event.findOne({_id: req.params.id}).then(function(event){
                    res.send(event); 
                })
            
            })

        })
     })
 })

}