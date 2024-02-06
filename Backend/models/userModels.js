const mongoose = require("mongoose");

const userModels = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add user name"],
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add user password"],
      minlength: 3,
      maxlength: 1024,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userModels);
