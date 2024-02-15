const express = require("express");
const router = express.Router();
const { registerUser, loginUser, chatBot } = require("../controllers/users");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/bot", chatBot);

module.exports = router;
