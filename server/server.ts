require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripeRoute = require("./routes/stripeRoute");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const customerRoute = require("./routes/customerRoute");
const loginUser = require("./routes/customerRoute");
const { productsRoute } = require("./routes/productsRoute");
const cookieSession = require("cookie-session");
const userRoute = require("./routes/userIdRoute");
const verifySession = require("./routes/verifySessionRoute");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

app.use(
  cookieSession({
    secret: "s3cr3t",
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: false,
  })
);

//Routes
app.use("/checkout", stripeRoute);
app.use("/user", customerRoute);
app.use("/user", loginUser);
app.use("/products", productsRoute);
app.use("/user", userRoute);
app.use("/verify", verifySession);

app.listen(3000, () => console.log("Server is up and runninnn..."));
