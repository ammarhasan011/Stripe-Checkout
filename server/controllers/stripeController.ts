import { Request, Response } from "express";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function createCheckoutSession(req: Request, res: Response) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "sek",
            product_data: {
              name: "Mobin skal",
              description: "Bla bla bla",
            },
            unit_amount: 20000,
          },
          quantity: 2,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/CONFIRMATION",
      cancel_url: "http://localhost:5173",
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Could not create checkout session" });
  }
}

module.exports = {
  createCheckoutSession,
};
