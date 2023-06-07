const express= require('express'); 
const router= express.Router();
const {authorizeRoles, isAuthenticatedUser}=require('../middelwares/auth'); 
const {createCategory, updateCategory, getCategory} =require('../controlers/categoryController')
router.route('/admin/category/create').post(createCategory);
router.route('/admin/category/update/:id').put(isAuthenticatedUser,authorizeRoles('admin'), updateCategory);
router.route('/admin/category').get(getCategory);

//
module.exports = router; 

//isAuthenticatedUser,authorizeRoles('admin')