import { Request, Response } from "express";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function checkVerifySession(req: Request, res: Response) {
  try {
    // console.log("sessionId", req.body.sessionId);
    //retrive session from stripe
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ verified: false });
    }

    const order = {
      created: session.created,
      customer: session.customer_details.name,
    };

    console.log("Order", order);

    res.status(200).json({ verified: true });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { checkVerifySession };
