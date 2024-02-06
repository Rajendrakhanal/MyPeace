const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const createToken = (_id) => {
  const jwtkey = process.env.SECRET_KEY;
  return jwt.sign({ _id }, jwtkey, { expiresIn: "2d" });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  let User = await user.findOne({ email });
  if (User) {
    return res
      .status(400)
      .json({ message: "User with given email already exists" });
  }

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are mandatory!" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Not a valid email" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: "Not a strong password" });
  }

  User = new user({ username, email, password });

  const salt = await bcrypt.genSalt(8);
  User.password = await bcrypt.hash(User.password, salt);

  await User.save();

  const token = createToken(user._id);

  res.status(200).json({ _id: User.id, username, email, token });
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const User = await user.findOne({ username });
    if (!User) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const validPassword = await bcrypt.compare(password, User.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = createToken(User._id);
    res.status(200).json({ _id: User._id, username, email: User.email, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
