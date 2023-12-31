import { Request, Response } from "express";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface cartItem {
  product: string;
  quantity: number;
}

interface RequestWithSession extends Request {
  session?: any;
}

async function createCheckoutSession(req: RequestWithSession, res: Response) {
  try {
    const cartItems: cartItem[] = req.body.cartItems;

    const customerId = req.session.customerId;

    const session = await stripe.checkout.sessions.create({
      line_items: cartItems.map((cartItem) => {
        return {
          price: cartItem.product,
          quantity: cartItem.quantity,
        };
      }),
      customer: customerId,
      mode: "payment",
      success_url: "http://localhost:5173/CONFIRMATION",
      cancel_url: "http://localhost:5173",
      allow_promotion_codes: true,
    });
    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Could not create checkout session" });
  }
}

module.exports = {
  createCheckoutSession,
};
