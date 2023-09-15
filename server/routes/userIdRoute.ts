const { Router } = require("express");
const Userrouter = Router();
const { checkLoggedInStatus } = require("../controllers/userIdController");

Userrouter.get("/isLoggedIn", checkLoggedInStatus);

module.exports = Userrouter;
