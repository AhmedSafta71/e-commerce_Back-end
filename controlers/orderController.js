const catchAssyncErrors = require('../middelwares/catchAssyncErrors');
const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');


//create a new order 
exports.newOrder = catchAssyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        orderStatus,
       
    } = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        orderStatus,
        paidAt: Date.now(),
        user: req.user._id,
    })
    res.status(200).json({
        success: true,
        order
    })

})
//get single order => /order/:id 
exports.getSingleOrder = catchAssyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
        return next(new ErrorHandler('no order found with this ID', 404))
    }
    res.status(200).json({
        success: true,
        order,
    })
})

//Get logged in user orders => /orders/me 
exports.myOrders = catchAssyncErrors(async (req, res, next) => {
    const orders = await Order.find({
        user: req.user.id
    })
    res.status(200).json({
        success: true,
        orders,
    })
})
//Get all orders (only admin ) => /admin/orders 
exports.allOrders = catchAssyncErrors(async (req, res, next) => {
    const orders = await Order.find()
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })
    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    })
})
//Update process order -Admin  => /admin/orders 
exports.updateOrders = catchAssyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('you have already delivered this order', 404))
    }
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity);
    })
   
    console.log( req.body.orderStatus); 
    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();
    res.status(200).json({
        success: true,

    })
})
async function updateStock(id, quantity) {
    console.log('the quantity is ',quantity);
    const product = await Product.findById(id);
    if (!product){
        console.log('product not found'); 
    }
    product.stock = product.stock - quantity;
    console.log('the stock after the order', product.stock);
    await product.save();
}

//Delete Order => /admin/order/:id

exports.deleteOrder = catchAssyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (!order){
        return next(new ErrorHandler(`No order found with the id :  ${req.params.id}`, 404));
}
await order.remove();
res.status(200).json({
    success: true,
    message: 'deleted successfully '

})
})