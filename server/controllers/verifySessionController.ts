import { Request, Response } from "express";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const fs = require("fs/promises");

const orderDBFile = "orders.json";

interface Order {
  created: string;
  customer: string;
  products: any[];
  totalAmount: number;
}

async function checkVerifySession(req: Request, res: Response) {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ verified: false });
    }

    const line_items = await stripe.checkout.sessions.listLineItems(
      req.body.sessionId
    );

    let totalAmount = 0;
    for (const item of line_items.data) {
      totalAmount += item.price.unit_amount * item.quantity;
    }

    const order = {
      created: session.created,
      customer: session.customer_details.name,
      products: line_items.data.map((item: any) => {
        return {
          product: item.description,
          quantity: item.quantity,
          price: item.price.unit_amount / 100,
        };
      }),
      totalAmount: totalAmount / 100,
    };

    console.log("Order", order);
    await addOrderToDatabase(order);

    res.status(200).json({ verified: true });
  } catch (error) {
    console.log(error);
  }
}

async function addOrderToDatabase(order: Order) {
  let orders: Order[] = [];
  try {
    const data = await fs.readFile(orderDBFile, "utf8");
    if (data) {
      orders = JSON.parse(data);
    }

    orders.push(order);

    await fs.writeFile(orderDBFile, JSON.stringify(orders, null, 2));

    console.log(`Order saved: ${JSON.stringify(order)}`);
  } catch (error) {
    console.error("Error when saving order in the database:", error);
    throw error;
  }
}

module.exports = { checkVerifySession };
