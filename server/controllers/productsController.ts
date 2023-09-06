import { Request, Response } from "express";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await stripe.products.list();

    res.json(products.data);
  } catch (error) {
    console.error("Error fetching products from Stripe:", error);
    res.status(500).json({ error: "Unable to fetch products" });
  }
}

module.exports = { getAllProducts };
