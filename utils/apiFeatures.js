const { toLength } = require("lodash");

class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }


    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}
       
        this.query = this.query.find({...keyword}); 
        return this;
    }
     //filter by category
filter()
{
    const queryCopy ={ ...this.queryStr}; 

     //removing fields from the query 
     const removeFields = ['keyword','limit', 'page']
     removeFields.forEach(el => delete queryCopy[el]); 
     console.log('category filtring',queryCopy);
     
       //filter by price /ratings

let  queryStr= JSON.stringify(queryCopy);
queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match =>`$${match}` ), 
console.log('queryStr final',JSON.parse(queryStr)); 

this.query=this.query.find(JSON.parse(queryStr)).clone();

return this
/*
console.log('querystr',queryStr ); 
queryStr=JSON.parse(queryStr); 
console.log('querystr after parse ',queryStr ); 
let priceJsonCopy={};
let priceJson= queryStr['price']; 
for ( let el in priceJson) {
    priceJsonCopy[el]=Number(priceJson[el]);
}
console.log('priceJsonCopy',priceJsonCopy); 
queryStr['price']= priceJsonCopy; 
console.log('finalqueryStr', queryStr); 
*/
}


/*
queryStr[price]= parseInt(queryStr['price']); 

this.query=this.query.find(JSON.parse(queryStr));
console.log( 'after parse json'); 
return this;  */

 
//pagination
pagination(resPerPage){
    const currentPage= Number(this.queryStr.page)|| 1; 
    const skip= resPerPage *(currentPage - 1); 
    //limit: function to limit the number of products per page 
    this.query = this.query.limit(resPerPage).skip(skip); 
    return this; 
}
}
module.exports= APIFeatures; 