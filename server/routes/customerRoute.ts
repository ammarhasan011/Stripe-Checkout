const express = require("express");
const router = express.Router();
const {
  createStripeCustomer,
  loginUser,
} = require("../controllers/customerController");

router.post("/registerUser", createStripeCustomer);
router.post("/loginUser", loginUser);

export const customerRoute = router;
module.exports = router;
