const express = require("express");
const cors = require("cors");
const app = express();
const dashboard = require('./routes/dashboard')

// Middleware
app.use(cors("*"));
app.use(express.json());

// DOTENV helps access .env file
require("dotenv").config();

const port = process.env.PORT || 3000;

// Configuring homeroute
app.use("/api/v1", dashboard);

// Defining start method to get backend started up!
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
