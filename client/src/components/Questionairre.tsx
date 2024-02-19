import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Question } from "../types/question";

const questions: Question[] = [
  {
    text: "Have you experienced any significant life changes or stressors recently?",
    isYesNo: true,
  },
  { text: "Do you often feel overwhelmed or anxious?", isYesNo: true },
  {
    text: "Have you noticed any changes in your appetite or weight?",
    isYesNo: true,
  },
  {
    text: "Do you have difficulty concentrating or making decisions?",
    isYesNo: true,
  },
  {
    text: "Have you experienced any loss of interest or pleasure in activities you once enjoyed?",
    isYesNo: true,
  },
  { text: "Do you often feel sad, hopeless, or empty?", isYesNo: true },
  { text: "Have you had thoughts of self-harm or suicide?", isYesNo: true },

  {
    text: "Have you experienced any traumatic events in your life?",
    isYesNo: true,
  },
  {
    text: "Do you have a history of mental health issues in your family?",
    isYesNo: true,
  },

  {
    text: "Have you ever received mental health treatment or counseling in the past?",
    isYesNo: true,
  },
];

const Questionnaire: React.FC = () => {
  const chatNavigation = useNavigate();

  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("No")
  );
  const [response, setResponse] = useState<string | undefined>("");

  const handleAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await submitAnswers(questions);
    setResponse(response);
  };

  const submitAnswers = async ( questions: Question[]) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/users/bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ responses: questions, initialQuestion:true}),
      });
      const data = await response.json();
      console.log(data)
      chatNavigation("/chat");
    } catch (error) {
      console.error("Error submitting answers:", error);
      return "Error submitting answers";
    } 
  };

  return (
    <div className="space-y-4 mx-4 md:mx-32 lg:mx-48">
      <form onSubmit={handleSubmit}>
        {questions.map((item, index) => (
          <div
            key={index}
            className="flex flex-col px-4 mt-4 md:mt-4 p-4 rounded-lg text-blue-800 border-blue-300 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
          >
            <p className="mb-2">{item.text}</p>
            <div className="flex space-x-2">
              {item.isYesNo ? (
                <>
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
                </>
              ) : (
                // For questions requiring more nuanced answers, adjust the options as needed.
                ["Not at all", "Sometimes", "Often", "Always"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => handleAnswerChange(index, option)}
                      className="radio radio-primary"
                    />
                    <span>{option}</span>
                  </label>
                ))
              )}
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

      {response && (
        <div className="mt-4 p-4 rounded-lg text-blue-800 border-blue-300 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
