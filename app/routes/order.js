const express = require('express');
const router = express.Router();
const orderControllers=require("./../controllers/orderController")
module.exports.setRouter = (app) => {
    app.post(`/orders/create`, orderControllers.CreateNewOrder);
    app.post(`/orders/update`, orderControllers.updateOrder);
    app.get(`/orders/list`, orderControllers.getAllOrders);
    app.get(`/orders/search/:orderId`, orderControllers.getAOrder);
    app.post(`/orders/delete/:orderId`, orderControllers.deleteOrder);
}