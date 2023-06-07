const mongoose = require('mongoose');

const catrgorySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please enter category name'],
        maxlength: [30, 'Your name cannot exceed 30 characters'], 
        unique : true
    },
    slug:{
        type : String, 
        maxlength: [20, 'Your name cannot exceed 20 characters']
    },
    content : {
        type : String, 
        required: [true, 'Please enter category content'],

    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,  
    },
    createdAt: {
        type: Date,
        default: Date.now
    } 
})

    module.exports = mongoose.model('category',catrgorySchema) ; 