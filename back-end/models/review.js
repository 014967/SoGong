const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    productId: {
        type: String,
        required : [true]
    },
    userId: {
        type: String,
        required : [true]
    },
    recommend: {
        type: String,
        required : [true]
    },
    deliveryrating: {
        type: String,
        required : [true]
    },
    score: {
        type: Number,
        required : [true]
    },
    comment: {
        type: String,
        maxlength: 20,
        default: ""
    },
    date: {
        type: Date,
        default: k_date = () => {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth();
            let today = date.getDate();
            let hours = date.getHours() + 9;
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            let milliseconds = date.getMilliseconds();
            return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
        }
    },
    purchaseId : 
    {
        type : String, 
    },
    username  :
    {
        type : String
    }
})

const Review = mongoose.model('review', ReviewSchema);

module.exports = { Review }