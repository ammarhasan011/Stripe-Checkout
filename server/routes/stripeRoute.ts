const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../controllers/stripeController");

router.post("/create-checkout-session", createCheckoutSession);

export const stripeRoute = router;
module.exports = router;
