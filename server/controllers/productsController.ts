import { Request, Response } from "express";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await stripe.products.list();
    const productsWithInfo: any[] = [];

    for (const product of products.data) {
      const prices = await stripe.prices.list({ product: product.id });

      if (prices.data.length > 0) {
        const price = prices.data[0];
        const productInfo = {
          id: product.id,
          name: product.name,
          description: product.description,
          image: product.images[0],
          price: price.unit_amount / 100,
          default_price: price.id,
        };
        productsWithInfo.push(productInfo);
      }
    }

    res.json(productsWithInfo);
  } catch (error) {
    console.error("Error fetching products from Stripe:", error);
    res.status(500).json({ error: "Unable to fetch products" });
  }
}

module.exports = { getAllProducts };
