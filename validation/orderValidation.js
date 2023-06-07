const yup = require("yup");

//create schema validattion 
const createOrderSchema = yup.object().shape({
    shippingInfo:yup.object().shape({
        address: yup.string().required(),
        city: yup.string().required(),
        phoneNo: yup.string().required(),
        postalCode: yup.string().required(),
        country: yup.string().required(),

    }),

     orderItems: yup.array().of(yup.object().shape({
    name: yup.string().required(),
    quantity: yup.number().required(),
    image: yup.string().required(),
    price: yup.number().required(),
     })),

     paymentInfo: yup.object().shape({
    id: yup.string(),
    status: yup.string(),
    itemsPrice: yup.number().required().default(0.0),
    taxPrice: yup.number().required().default(0.0),
    shippingPrice: yup.number().required().default(0.0),
    totalPrice: yup.number().required().default(0.0),
    orderStatus: yup.string().required().default('processing'),
}), 
}); 

// update schema validation

const updateOrderSchema = yup.object().shape({
    shippingInfo:yup.object().shape({
        address: yup.string(),
        city: yup.string(),
        phoneNo: yup.string(),
        postalCode: yup.string(),
        country: yup.string(),
    }),
     orderItems:yup.array().of(yup.object().shape({
    name: yup.string(),
    quantity: yup.number().required().integer(),
    image: yup.string(),
    price: yup.number()
     })),

     paymentInfo: yup.object().shape({
    id: yup.string(),
    status: yup.string(),
    itemsPrice: yup.number().default(0.0),
    taxPrice: yup.number().default(0.0),
    shippingPrice: yup.number().default(0.0),
    totalPrice: yup.number().default(0.0),
    orderStatus: yup.string().required().default('processing'),
}), 
})

module.exports = {createOrderSchema, updateOrderSchema};