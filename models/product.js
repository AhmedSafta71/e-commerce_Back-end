const mongoose=require('mongoose'); 
const productSchema=new mongoose.Schema({
    name: {
        type: String, 
        required:[ true, 'Please enter product name '], 
        //The trim() method removes whitespace from both sides of a string.
        trim : true, 
        maxLength: [100,'Product name can not exceed 100 characters']
    },
    price :{
        type :Number, 
        required:[ true, 'Please enter product price '], 
        //The trim() method removes whitespace from both sides of a string.
        maxLength: [5,'Product price can not exceed 5 numbers ']
    }, 
    description : {
        type: String,
        required:[ true, 'Please enter description '],
    }, 
    ratings:{
        type: Number,
        default:0
    }, 
    images :[{
        public_id:{
            type: String,
            required:[true]
        }, 
        url: {
            type: String,
            required:[true], }
    }], 
    category :{
        type: String,
        required:[true, 'Please select a category for the  product'], 
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                "Books",
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
        ],
        message: 'Please select correct category for product'
    }
},

seller: {
    type: String,
    required: [true, 'Please enter product seller']
},
stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    maxLength: [5, 'Product name cannot exceed 5 numbers'],
    default: 0
},
numOfReviews: {
    type: Number,
    default: 0
},
reviews:[
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true , 
        },
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: false
        }
    }
],
// register user that created the product
user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: false,  
},
createdAt: {
    type: Date,
    default: Date.now
} 
})

module.exports=mongoose.model('Product', productSchema); 