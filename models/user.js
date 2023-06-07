const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// crypto is a building package : we  don't have to install it
const crypto = require('crypto');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        validate: [validator.isEmail, 'Please enter valid email address'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false, 
            default:'../assets/default.jpg'
     },
    },
      
     role: {
         type: String,
         default: 'admin'
     },
     createdAt: {
         type: Date,
         default: Date.now
     },

    resetPasswordToken: String,
    resetPasswordExpire: Date
})
//encrypting password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    //10 is the sort value
    this.password = await bcrypt.hash(this.password, 10);
})

//compare user Password
userSchema.methods.comparePassword=async function(entredPassword){
    
    return await bcrypt.compare(entredPassword, this.password); 
}

//return JWT token
userSchema.methods.getJwtToken= function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

// Generate password reset token 
userSchema.methods.getResetPasswordToken = function (){
    //generate token 
     const resetToken=crypto.randomBytes(20).toString('hex');
    //hash and reset password token
    this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex');

    //set token expire time 
    this.expirePasswordTime= Date.now()+15*60*1000
    return resetToken
    
}


module.exports = mongoose.model('User', userSchema);