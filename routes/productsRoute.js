const express = require('express');
const router = express.Router();
const {createProductSchema, updateProductSchema,createReviewSchema,updateReviewSchema}= require('../validation/productValidation');
const validation =require('../middelwares/validation');

// importing getProducts 
const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct, 
    createProductReview, 
    getProductReviews, 
    deleteReview
} = require('../controlers/productController')
const {isAuthenticatedUser, authorizeRoles}=require('../middelwares/auth')

router.route('/products').get(getProducts);
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),validation(createProductSchema),newProduct);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),validation(updateProductSchema),updateProduct)
                                  .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);                                     
router.route('/review').put(isAuthenticatedUser,validation(updateReviewSchema),createProductReview);     
router.route('/reviews').get(isAuthenticatedUser,getProductReviews);      
router.route('/admin/reviews/delete').delete(isAuthenticatedUser,deleteReview );  


module.exports = router;