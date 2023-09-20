const { Router } = require("express");
const sessionRouter = Router();
const {
  checkVerifySession,
} = require("../controllers/verifySessionController");

sessionRouter.post("/verify-session", checkVerifySession);

module.exports = sessionRouter;
