const express = require("express");
const router = express.Router();
const { checkLoggedInStatus } = require("../controllers/userIdController");

router.get("/isLoggedIn", checkLoggedInStatus);

module.exports = router;
