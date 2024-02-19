const mongoose = require("mongoose");

const questionairreSchema = new mongoose.Schema({
  questionsWithAnswers: [
    {
      question: {
        type: String,
        required: [true, "Please add question"],
      },
      answer: {
        type: String,
        required: [true, "Please add answer"],
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Questionairre", questionairreSchema);
