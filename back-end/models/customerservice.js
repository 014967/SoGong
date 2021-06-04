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
        type: String
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
})

const Customerservice = mongoose.model('customerservice', CustomerserviceSchema);

module.exports = { Customerservice }