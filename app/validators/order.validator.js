const { body ,check } = require("express-validator");

// model
const orderModel = require('../models/order.model');

const createOrderValidator = ()=>{
     return [
        body('order_id')
        .isString()
        .notEmpty()
        .withMessage('OrderId value cannot be empty')
        .custom(async(val) => {
            let isExist = await orderModel.findOne({ order_id:val });
            if (isExist) {
                return Promise.reject(
                    'OrderId is already exists Please try with different one'
                );
            }
       }), 
       body('item_name').isString().isLength({ min:2 }).withMessage('Please enter valid item name'),
       body('price').isNumeric().withMessage('Please enter valid price item'),
       check('order_date').trim().isDate().withMessage('Please enter valid order date format'),
       check('delivery_date').trim().isDate().withMessage("Please enter valid delivery data format")
     ];
}

const updateOrderValidator = ()=>{
    return [
       body('item_name').isString().isLength({ min:2 }).withMessage('Please enter valid item name'),
       body('price').isNumeric().withMessage('Please enter valid price item'),
       check('order_date').trim().isDate().withMessage('Please enter valid order date format'),
       check('delivery_date').trim().isDate().withMessage("Please enter valid delivery data format")
     ];
}


module.exports = {  createOrderValidator , updateOrderValidator };