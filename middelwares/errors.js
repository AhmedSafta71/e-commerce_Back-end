const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    //Development mode Error
    //console.log('process.env.NODE_ENV',process.env.NODE_ENV)

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

/*

    //Handling duplicate Mongoose id error 
    if (err.code === 11000) {
        const message = `Dupliacate ${object.keys(err.KeyValue) } entred`
        error = new ErrorHandler(message, 400)
    }
    //handling Mongoose validation error 
    if (err.name ==='validationError'){
        const message =object.values(err.values).map(value => value.message);
        error=new ErrorHandler(message,400); 
    }

*/
    // Handling wrong JWT error
    if (err.name === 'JsonWebTokenError') {
        const message = 'JSON Web Token is invalid. Try Again!!!'
        error = new ErrorHandler(message, 400)
    }

    // Handling Expired JWT error
    if (err.name === 'TokenExpiredError') {
        const message = 'JSON Web Token is expired. Try Again!!!'
        error = new ErrorHandler(message, 400)
    }

   // Production  Mode Error
    if (process.env.NODE_ENV==='PRODUCTION')
     {
        let error = {...err};
        error.message = err.message;
        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error',

        })
    }

}