const express = require('express');
const routes = express.Router();
const { validate } = require('../middlewares/validate.middleware');
const orderController = require('../controllers/order.controller');

// validator
const validator = require("../validators/order.validator");


routes.post(
    '/create',
    validator.createOrderValidator(),
    validate,
    orderController.create
);

routes.post(
    '/update/:id',
    validator.updateOrderValidator(),
    validate,
    orderController.update
);

routes.get(
    '/list',
    orderController.list    
)
routes.delete(
    "/delete/:id",
    orderController.delete 
)

routes.get(
    '/search/:orderId',
    orderController.getOrderById
)

module.exports = routes;