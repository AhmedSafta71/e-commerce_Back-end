const express = require('express');
const router = express.Router();
const  {createOrderSchema,updateOrderSchema}= require('../validation/orderValidation'); 
const validation =require('../middelwares/validation')

const {
    isAuthenticatedUser,
    authorizeRoles, 
   
} = require('../middelwares/auth')
const {newOrder,getSingleOrder,myOrders,allOrders,updateOrders,deleteOrder }=require('../controlers/orderController'); 
router.route('/order/new').post(isAuthenticatedUser,validation(createOrderSchema),newOrder); 
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder); 
router.route('/orders/me').get(isAuthenticatedUser,myOrders); 
router.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles('user'),allOrders); 
router.route('/admin/order/:id').put(isAuthenticatedUser,validation(updateOrderSchema),authorizeRoles('admin'),updateOrders); 
router.route('/admin/order/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteOrder); 

module.exports=router; 
//