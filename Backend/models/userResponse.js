const mongoose = require("mongoose");

const userResponseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    responses: {
      type: [
        {
          role: {
            type: String,
            enum: ["user", "model"],
            required: true,
          },
          parts: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserResponse", userResponseSchema);
