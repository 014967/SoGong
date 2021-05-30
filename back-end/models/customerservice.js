const mongoose = require('mongoose');

const CustomerserviceSchema = mongoose.Schema({
    id: {
        type: String,
        required : [true]
    },
    title: {
        type: String,
        required : [true]
    },
    contents: {
        type: String,
        required : [true]
    },
    answer: {
        type: String,
        default: ""
    },
    orderlist: {
        type: String,
        required : [true]
    },
    date: {
        type: Date,
        default: Date.now()
    },
})

const Customerservice = mongoose.model('customerservice', CustomerserviceSchema);

module.exports = { Customerservice }