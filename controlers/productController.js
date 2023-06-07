const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAssyncErrors = require('../middelwares/catchAssyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')
// Create new product   =>   /admin/product/new

exports.newProduct = catchAssyncErrors(async (req, res, next) => {

    let images = []

    if (typeof req.body.images === 'string') {
        images.push(req.body.images)

    } else {
        images = req.body.images

    }
    console.log('images table ', images);
    let imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
        console.log('image to String', JSON.stringify(images[i].url));

        const result = await cloudinary.v2.uploader.upload(images[i].url, {
            folder: 'products'
        });


        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })


    }

    req.body.images = imagesLinks
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        id: product.id,
        product
    })
})

//get all products =>/products?keyword=headPhones 
exports.getProducts = catchAssyncErrors(async (req, res, next) => {
   
    //total number of products 
    const productsCount = await Product.countDocuments();
    //how many products to display per page 
    //how many products to display per page 
    const resPerPage = 8;
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter();
    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

   apiFeatures.pagination(resPerPage);
   
    products = await apiFeatures.query.clone();
    
        res.status(200).json({
            success: true,
          // result: `${filteredProductsCount} out of ${productsCount} products found`,
            resPerPage,
            products, 
            productsCount,
            filteredProductsCount 
        })
        return next(new ErrorHandler('error', 400)); 
})
//get single product details => /product/:id
exports.getSingleProduct = catchAssyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    res.status(200).json({
        success: true,
        message: "Product  found successfully",
        product
    })
})

//update product => admin/product/:id (put request)
exports.updateProduct = catchAssyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    })
    res.status(200).json({
        success: true,
        product
    })
})

//delete product = /admin/product/id
exports.deleteProduct = catchAssyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "product removed successfully"
    });

})

//create Newr Review => /review
exports.createProductReview = catchAssyncErrors(async (req, res, next) => {
    const rating = req.body.rating;
    const comment = req.body.comment;
    const productId = req.body.productId;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment: comment


    }
    //find product in the db to update reveiw
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        rev => rev.user.toString() === req.user._id.toString()
    )
    // if reviewed we run all reviews and we search the review of our user 
    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
    } else {
        product.reviews.push(review);
        //update the number of reviews 
        product.numOfReviews = product.reviews.length;
    }
    //calculate the overall rating  (4.5  -  4.9 -  5)
    //the reduce method accepts many values and return back just one value
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.numOfReviews;
    await product.save({
        validateBeforeSave: false
    });
    res.status(200).json({
        success: true,
        message: 'review saved successfully ',
        product
    });
})

//get Product reviews => /reviews
exports.getProductReviews = catchAssyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})
//delete Product review => /admin/review/delete
exports.deleteReview = catchAssyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())

    //update the number of reviews 
    const numOfReviews = reviews.length;
    console.log(numOfReviews);
    //update the ratings 
    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews;
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }), {
        new: true,
        runValidators: true,
        useFindAndModify: false

    }

    res.status(200).json({
        success: true,
        message: "reviews deleted & updated successfully ",
    })
})

/*
//delete all products
exports.deleteProduct= async (req,res) =>{
    const products = await Product.deleteMany(); 
res.status(200).json({
    success:true, 
    count: products.length, 
   products
}) 

}
*/