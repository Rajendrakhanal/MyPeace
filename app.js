const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/userRoute");
const connectDatabase = require("./database/connect");

// Middleware
app.use(cors("*"));
app.use(express.json());

// DOTENV helps access .env file
require("dotenv").config();

const port = process.env.PORT || 3000;
const uri = process.env.CONNECTION_STRING;

// Configuring routes
app.use("/api/v1/user", router);

// Defining start method to get backend started up!
const start = async () => {
  try {
    app.listen(port, async () => {
      await connectDatabase(uri);
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
