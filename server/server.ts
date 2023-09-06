require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripeRoute = require("./routes/stripeRoute");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const customerRoute = require("./routes/customerRoute");
const loginUser = require("./routes/customerRoute");
const cookieSession = require("cookie-session");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

app.use(
  cookieSession({
    secret: "s3cr3t",
    maxAge: 1000 * 10,
    httpOnly: false,
  })
);

//Routes
app.use("/checkout", stripeRoute);
app.use("/user", customerRoute);
app.use("/user", loginUser);

app.listen(3000, () => console.log("Server is up and runninnn..."));
