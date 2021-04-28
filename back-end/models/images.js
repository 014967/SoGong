const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ImgSchema = new Schema({
    img: { data: Buffer, contentType: String}
}, {
    timestamps: true
});


const Image = mongoose.model('image', ImgSchema);

module.exports = Image;