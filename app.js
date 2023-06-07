const express = require('express');
const fileUpload = require('express-fileupload'); 
const path =require('path'); 
//express app
const app = express();
const dotenv=require('dotenv');
const errorMiddelware= require('./middelwares/errors');
const cookieParser= require('cookie-parser');

const connectDatabase = require('./config/database');
// requirements for upload images from cloudinary 
const bodyParser=require('body-parser'); 
const cloudinary = require('cloudinary'); 

// handle uncaught exceptions 
process.on('uncaughtException', err =>{
    console.log(`error: ${err.stack}` ); 
    console.log("shutting down due to uncaught exceptions "); 
    process.exit(1)
})
//setting up config file 
dotenv.config( {path: 'config/config.env'})
connectDatabase(); 
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})
const {
    result
} = require('lodash');
//use express.json
app.use(express.json());
//use the cookie-parser
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended:true })); 
app.use(fileUpload({useTempFiles: true})); 

 
//import all routes
const products = require('./routes/productsRoute');
const auth = require('./routes/authRoute');
const order = require('./routes/orderRoute');
 const payement =require('./routes/payementRoute'); 
 const category =require ('./routes/categoryRoute')
//using default  routes if path not specified 
try {
app.use('', products);
app.use('', auth); 
app.use('', order); 
 app.use('', payement); 
 app.use('', category); 
}
catch(err){
    console.log('im ther error', err); 
}

// frontend  connection with backend

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/public/index.html'))
    })
}



// middelware to handle errors
app.use(errorMiddelware); 


//set up cloudianry 
try{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    }) 

}
catch(err) {
    console.log(err); 
}


// Handle Unhandled Promise rejections

process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
}) 