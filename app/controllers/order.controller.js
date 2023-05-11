// library
const moment = require('moment');

// utils
const resUtils = require('../utils/response.utils');

// model  
const orderModel = require('../models/order.model');

/* Post Request ==> /api/order/create */
exports.create = async(req,res)=>{
    try{
     const requestData = req.body; 
     
     const createdOrder = await orderModel.create(requestData);
     
     res.status(200).json(
        resUtils.successResponse('Order created successfully', createdOrder )
     );   
    }catch(err){
       res.status(500).json(resUtils.errorResponse(err.message));  
    }
     
}

/* Post Request ==> /api/order/update */
exports.update = async (req,res)=>{
     try{
        const requestData = req.body;
        const orderId = req.params.id;
        
        const orderExist = await orderModel.findById(orderId); 

        if(!orderExist) return res.status(400).json(resUtils.errorResponse('No order exist'));
         
        const updatedOrder = await orderModel.findByIdAndUpdate(
            { _id: orderId },  
            { $set : { ...requestData } }
        )

        res.status(200).json(
            resUtils.successResponse('Updated order successfully',updatedOrder)
        )
     }catch(err){
        res.status(500).json(resUtils.errorResponse(err.message));
     }

}

/* Get request ==> /api/order/list */
exports.list = async (req,res) =>{
      try{
        let allOrder = await orderModel.find({}).select('_id order_id item_name price order_date delivery_date');
        allOrder = allOrder.map(({_id,order_id,item_name,price,order_date,delivery_date}) =>{
           return {
            _id , order_id , item_name , price ,
            order_date: moment(order_date).format('YYYY/MM/DD'),
            delivery_date: moment(delivery_date).format('YYYY/MM/DD') 
           } 
        })
        res.status(200).json(resUtils.successResponse('Get all order list', allOrder ));
      }catch(err){
        res.status(500).json(resUtils.errorResponse(err.message));
      }
}

/* Delete request ==> /api/order/delete/:id */
exports.delete = async(req,res)=>{
    try{
      const id = req.params.id;
    
      const orderExist = await orderModel.findOne({ _id: id });
      
      if(!orderExist) return res.status(400).json(resUtils.errorResponse('No order exist'));

      await orderModel.findByIdAndDelete({ _id: id }); 
       
      res.status(200).json(resUtils.successResponse('Order deleted successfully'));
    }catch(err){
        res.status(500).json(resUtils.errorResponse(err.message));
    }
}

/* Get request ==> /api/order/search/:id */

exports.getOrderById = async(req,res)=>{
    try{
       const orderId = req.params.orderId;
       
       const orderExist = await orderModel.findOne({ order_id: orderId }).select('_id order_id item_name price order_date delivery_date');

       if(!orderExist) return res.status(400).json(resUtils.errorResponse('No order exist'));
         
       res.status(200).json(resUtils.successResponse('Get Order details successfully', orderExist ));

    }catch(err){
        res.status(500).json(resUtils.errorResponse(err.message));
    }
}