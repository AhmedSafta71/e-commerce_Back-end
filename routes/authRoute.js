const express = require('express');
const router = express.Router();
const {userCreateSchema,updateProfileSchema,loginSchema,updatePasswordSchema,forgotPasswordSchema,resetPasswordSchema}= require('../validation/userValidation');
const {
    isAuthenticatedUser,
    authorizeRoles, 
} = require('../middelwares/auth')
const validation = require('../middelwares/validation')
const {
    registerUser,
    loginUser,
    logout,
    getUserProfile,
    forgotPassword,
    updatePassword,
    resetPassword,
    updateProfile,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser, 
    deleteAllUsers

} = require('../controlers/userController');
//validation(userSchema)
router.route('/register').post(validation(userCreateSchema),registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/forgot').post(validation(forgotPasswordSchema),forgotPassword);
router.route('/password/update').put(isAuthenticatedUser,validation(updatePasswordSchema), updatePassword);
router.route('/password/reset/:token').put(validation(resetPasswordSchema),resetPassword);
router.route('/me/update').put(isAuthenticatedUser,validation(updateProfileSchema),updateProfile);
router.route('/admin/users').get(isAuthenticatedUser, allUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser); 
    router.route('/admin/users/deleteAll').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteAllUsers); 
//validation(loginSchema)
module.exports = router;