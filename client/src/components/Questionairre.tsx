import React, { useState } from "react";

import userService from "../services/user";
import { useNavigate } from "react-router-dom";

interface QuestionsWithAnswers {
  question: string;
  answer: string;
}

const questions = [
  "Have you experienced any significant life changes or stressors recently?",
  "Do you often feel overwhelmed or anxious?",
  "Have you noticed any changes in your appetite or weight?",
  "Do you have difficulty concentrating or making decisions?",
  "Have you experienced any loss of interest or pleasure in activities you once enjoyed?",
  "Do you often feel sad, hopeless, or empty?",
  "Have you had thoughts of self-harm or suicide?",
  "Have you experienced any traumatic events in your life?",
  "Do you have a history of mental health issues in your family?",
  "Have you ever received mental health treatment or counseling in the past?",
];

const Questionnaire: React.FC = () => {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("No"),
  );

  const handleAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const questionsWithAnswers: QuestionsWithAnswers[] = [];
    questions.forEach((question: string, index: number) => {
      questionsWithAnswers.push({
        question,
        answer: answers[index],
      });
    });

    await submitAnswers(questionsWithAnswers);
  };

  const submitAnswers = async (
    questionsWithAnswers: QuestionsWithAnswers[],
  ) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/questionairre",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userService.getToken()}`,
          },
          body: JSON.stringify({ questionsWithAnswers }),
        },
      );
      
      await response.json();

      navigate("/chat");
    } catch (error) {
      return "Error submitting answers";
    }
  };

  return (
    <div className="space-y-4 mx-4 md:mx-32 lg:mx-48">
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div
            key={index}
            className="flex flex-col px-4 mt-4 md:mt-4 p-4 rounded-lg text-blue-800 border-blue-300 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
          >
            <p className="mb-2">{question}</p>
            <div className="flex space-x-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value="Yes"
                  checked={answers[index] === "Yes"}
                  onChange={() => handleAnswerChange(index, "Yes")}
                  className="radio radio-primary"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value="No"
                  checked={answers[index] === "No"}
                  onChange={() => handleAnswerChange(index, "No")}
                  className="radio radio-primary"
                />
                <span>No</span>
              </label>
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full mt-5 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Questionnaire;
