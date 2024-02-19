const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

const createToken = (_id) => {
  const jwtkey = process.env.SECRET_KEY;
  return jwt.sign({ _id }, jwtkey, { expiresIn: "2d" });
};

const registerUser = async (req, res) => {
  const { firstName, lastName, username, password, confirmPassword } = req.body;

  let User = await user.findOne({ username });
  if (User) {
    return res
      .status(400)
      .json({ message: "User with given username already exists" });
  }

  if (!firstName || !lastName || !username || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are mandatory!" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password should be atleast 8 characters long" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  User = new user({ firstName, lastName, username, password });

  const salt = await bcrypt.genSalt(8);
  User.password = await bcrypt.hash(User.password, salt);

  await User.save();

  res.status(200).json({ _id: User.id, firstName, lastName, username });
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
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    }

    const { firstName, lastName } = User;
    const token = createToken(User._id);
    res
      .status(200)
      .json({ _id: User._id, firstName, lastName, username, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const chatBot = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const { responses } = req.body;
    console.log(responses.messages)
    if (!responses || !Array.isArray(responses)) {
      return res
        .status(400)
        .json({ error: "Invalid or missing 'responses' array in the request body." });
    }

    let paragraph = responses.map(response => {
      return `${response.text} (${response.isYesNo})`;
    }).join('\n');

    console.log("Constructed paragraph:", paragraph);

    const result = await model.generateContent(
      `Respond answering the mental state of an individual having these ${paragraph}. And answer like you may have been....`
    );

    const response = result.response.text();
    console.log("Generated response:", response);

    res.status(200).json({ success: true, message: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


module.exports = { registerUser, loginUser, chatBot };
