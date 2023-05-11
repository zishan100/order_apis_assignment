const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    order_id:{
        type:String,
    },
    item_name:{
        type:String
    },
    price:{
        type:Number
    },
    order_date:{
        type:Date
    },
    delivery_date:{
        type:Date
    }
}, { timestamps: true });

module.exports = mongoose.model('order', Order);