import { Request, Response } from "express";

function checkVerifySession(req: Request, res: Response) {
  try {
    console.log("sessionId", req.body.sessionId);
    res.status(200).json({ verified: true });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { checkVerifySession };
