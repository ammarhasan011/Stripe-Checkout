require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripeRouter = require("./routes/stripeRouter");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const customerRoute = require("./routes/customerRoute");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/checkout", stripeRouter);
app.use("/user", customerRoute);

app.listen(3000, () => console.log("Server is up and runninnn..."));
