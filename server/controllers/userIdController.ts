import { Request, Response } from "express";

interface RequestWithSession extends Request {
  session?: any;
}

function checkLoggedInStatus(req: RequestWithSession, res: Response) {
  if (req.session.customerId) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
}

module.exports = { checkLoggedInStatus };
