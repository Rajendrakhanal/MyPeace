const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add first name"],
      minlength: 2,
    },
    lastName: {
      type: String,
      required: [true, "Please add last name"],
      minlength: 2,
    },
    username: {
      type: String,
      required: [true, "Please add username"],
      minlength: 6,
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "Please add password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
