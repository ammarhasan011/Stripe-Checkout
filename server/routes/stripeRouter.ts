const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../controllers/stripeController");

// Endpunkt för att skapa en checkout-session
router.post("/create-checkout-session", createCheckoutSession);

export const stripeRouter = router;
module.exports = router;
