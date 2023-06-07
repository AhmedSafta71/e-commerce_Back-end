const ErrorHandler= require("../utils/errorHandler"); 
const validation = (schema) => async (req, res, next) => {
    console.log(req.body); 
    try {
        await schema.validate(req.body);
        next();
       
    } catch (error) {
        next(new ErrorHandler(error, 401));
        }
    

    }

module.exports = validation;