const express = require("express");
const router = express.Router();
const { createStripeCustomer } = require("../controllers/customerController");

router.post("/registerUser", createStripeCustomer);

export const customerRoute = router;
module.exports = router;
