
//Error handller Class 
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message); 
        this.statusCode=statusCode; 
        //creates a stack proprety on a target object 
Error.captureStackTrace(this, this.constructor)
}}
module.exports =ErrorHandler; 

