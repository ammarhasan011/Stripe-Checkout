import { Request, Response } from "express";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const fs = require("fs/promises");

let orders: any;
const orderDBFile = "orders.json";

interface CustomRequest extends Request {
  user?: {
    userId: string;
  };
}

async function getOrders(req: CustomRequest, res: Response) {
  try {
    // console.log("orders för ", req.params.id);

    const data = await fs.readFile(orderDBFile, "utf8");

    if (data) {
      orders = JSON.parse(data);
    }
    const userOrders = orders.filter(
      (order: any) => order.customer === req.params.id
    );

    res.status(200).json(userOrders);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong with orders" });
  }
}

module.exports = { getOrders };
