const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const UserResponse = require("../models/userResponse");
const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const interactWithGeminiAPI = async (userResponses) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history: userResponses.map((response) => ({
      role: response.role,
      parts: response.parts,
    })),
    generationConfig: {
      maxOutputTokens: 100,
    },
  });
  const msg = "How are you feeling right now?";

  const result = await chat.sendMessage(msg);
  const responseFromGemini = await result.response;
  return responseFromGemini.text();
};

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

const chatBot = async (req, res) => {
  const { userId, responses } = req.body;

  try {
    const userResponseEntry = new UserResponse({ userId, responses });
    await userResponseEntry.save();

    const geminiResponse = await interactWithGeminiAPI(responses);

    const modelResponseEntry = new UserResponse({
      userId,
      responses: [{ role: "model", parts: geminiResponse }],
    });
    await modelResponseEntry.save();

    res.json({ success: true, response: geminiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser, chatBot };
