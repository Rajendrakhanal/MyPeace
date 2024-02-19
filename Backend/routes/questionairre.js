const express = require("express");
const router = express.Router();
const { questionairre } = require("../controllers/questionairre");

router.post("/", questionairre);

module.exports = router;
