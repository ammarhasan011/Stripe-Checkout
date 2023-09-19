const { Router } = require("express");
const orderRouter = Router();

const { getOrders } = require("../controllers/ordersController");

orderRouter.get("/getAllOrders/:id", getOrders);

module.exports = orderRouter;
