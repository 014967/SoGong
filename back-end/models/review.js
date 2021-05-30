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
        default: Date.now()
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