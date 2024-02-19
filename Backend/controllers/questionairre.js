const Questionairre = require("../models/questionairre");

const questionairre = async (req, res) => {
  const { questionsWithAnswers } = req.body;

  if (!questionsWithAnswers) {
    return res
      .status(400)
      .json({ error: "'questionsWithAnswers' field is required." });
  }

  const user = req.user;

  const questionairre = new Questionairre({
    questionsWithAnswers,
  });

  const savedQuestionairre = await questionairre.save();
  user.questionairre = savedQuestionairre._id
  user.firstUser = false;
  await user.save();

  res.status(201).json(savedQuestionairre);
};

module.exports = { questionairre };
