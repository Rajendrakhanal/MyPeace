const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/", loginUser);

module.exports = router;