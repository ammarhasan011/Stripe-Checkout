require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripeRouter = require("./routes/stripeRouter");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/", stripeRouter);
// app.use("/user", userRouter);

app.listen(3000, () => console.log("Server is up and runninnn..."));
