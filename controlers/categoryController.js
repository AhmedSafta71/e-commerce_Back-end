const Category = require('../models/category');
const User= require('../models/user')
const catchAssyncErrors = require('../middelwares/catchAssyncErrors');
const ErrorHandler = require('../utils/errorHandler');
//create category =>  /admin/category/create 
exports.createCategory = catchAssyncErrors(async (req,res,next) => {
    req.body.user= req.User.id; 
    console.log('user id',req.body.user); 

    const category = await Category.create(req.body);
res.status(200).json({
    success: true ,
    mmessage: "new category created successfully", 
    category
})
})
//get category by id  =>  /category/:id 
exports.getCategory = catchAssyncErrors(async (req, res) => {
    const category = await Category.findById(req.params.id) ; 
    if (!category) {
        return next(new ErrorHandler('category not found', 404));
    }
    res.status(200).json({
        success: true,
        message:" category reached successfully",
        category 
})
})  
//update categgory => /admin/category/update/:id

exports.updateCategory = catchAssyncErrors(async (req, res) => {
    let category = await Category.findById(req.params.id) ; 
    if (!category) {
        return next(new ErrorHandler('category not found', 404));
    }
    category=await Category.findUseAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: true,
    })
    res.status(200).json ({
        success:true , 
        message: 'category updated successfuly', 
        category 
    })

})
