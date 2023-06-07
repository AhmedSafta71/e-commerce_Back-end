const yup = require("yup");
const createProductSchema = yup.object().shape({
    name: yup.string().required().max(30).trim(),
    price: yup.number(5).required().min(0),
    description: yup.string().required(),
    ratings: yup.number().required(),
    image: yup.array().of(yup.object().shape({
    public_id: yup.string().required(),
    url: yup.string().required(),
     })),
    category: yup.string().required(),
    seller: yup.string().required(),
    stock: yup.number().required().min(1).default(0),
    numOfReviews: yup.number().default(0),

        }   
)
const updateProductSchema = yup.object().shape({
    name: yup.string().max(30).trim(),
    price: yup.number(5).min(0),
    description: yup.string(),
    ratings: yup.number(),
    image: yup.array().of(yup.object().shape({
    public_id: yup.string(),
    url: yup.string(),
     })),
    category: yup.string(),
    seller: yup.string(),
    stock: yup.number().min(1).default(0),
    numOfReviews: yup.number().default(0),

        }   
)
const createReviewSchema =yup.object().shape({
    name: yup.string().required(),
    rating: yup.number().required(),
    comment: yup.string()
}) 

const updateReviewSchema =yup.object().shape({
    name: yup.string(),
    rating: yup.number(),
    comment: yup.string(),
}) 



module.exports = {createProductSchema, updateProductSchema,createReviewSchema,updateReviewSchema};