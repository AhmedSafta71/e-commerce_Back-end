const catchAssyncErrors= require( '../middelwares/catchAssyncErrors')
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY); 
// process srtipe payements => /payement/process
exports.processPayement = catchAssyncErrors(async(req,res,next)=>{
    const paymentIntent= await stripe.paymentIntent.create({
        amount: req.body.amount, 
        currenecy:'usd', 
        metadata:{
            integration_check:'accept_a_payement'
        }
    })
    res.status(200).json({
        success:true , 
        client_Secret: paymentIntent.client_Secret
        
    })
})
// send stripe APIkey => /stripeapi
exports.sendStripeApi = catchAssyncErrors(async(req,res,next)=>{

    res.status(200).json({
     stripeApiKey: process.env.STRIPE_API_KEY
        
    })
})