const User = require("../models/user");

const jwt = require("jsonwebtoken");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  } else {
    req.token = null;
  }

  next();
};

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    req.user = null;
    return res.status(401).json({ error: "Token missing or invalid" });
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET_KEY);

  if (!decodedToken._id) {
    req.user = null;
    return res.status(401).json({ error: "Token missing or invalid" });
  }

  req.user = await User.findById(decodedToken._id);

  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
