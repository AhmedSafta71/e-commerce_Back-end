const express = require('express')
const router = express.Router();

const {
    processPayement,
    sendStripeApi
} = require('../controlers/paymentController')

const { isAuthenticatedUser } = require('../middelwares/auth')

router.route('/payment/process').post(isAuthenticatedUser,processPayement);
router.route('/stripeapi').get(isAuthenticatedUser, sendStripeApi);

module.exports = router;