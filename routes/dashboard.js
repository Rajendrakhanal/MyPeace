const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Hello there peeps!");
});

module.exports = router;