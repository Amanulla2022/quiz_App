import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Question";
import Controls from "./Controls";

function Quiz({ type }) {
  const [questions, setQuestions] = useState([]); // quiz questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //  current question index
  const [quizTitle, setQuizTitle] = useState(""); // quiz title
  const [timer, setTimer] = useState(type === "multiple" ? 10 : 8); // for timer
  const [selectedOptions, setSelectedOptions] = useState([]); // for selected options
  const [score, setScore] = useState(0); // quiz score
  const [quizCompleted, setQuizCompleted] = useState(false); // quiz completion

  //  to fetch questions when quiz type is selected
  useEffect(() => {
    fetchQuestions(type);
    setQuizTitle(getQuizTitle(type));
  }, [type]);

  //  to decrement timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex]);

  //  to handle skip when timer reaches 0
  useEffect(() => {
    if (timer === 0) {
      handleSkip();
    }
  }, [timer]);

  // Function to fetch questions from API depend on selected buttons
  async function fetchQuestions(type) {
    let url = "";
    if (type === "multiple") {
      url = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;
    } else if (type === "truefalse") {
      url = `https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=boolean`;
    }

    try {
      const response = await axios.get(url);
      const data = response.data;
      if (data.response_code === 0) {
        const shuffledQuestions = data.results.map((question) => ({
          ...question,
          options: shuffleOptions([
            question.correct_answer,
            ...question.incorrect_answers,
          ]),
        }));
        setQuestions(shuffledQuestions);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  // to shuffle options
  function shuffleOptions(options) {
    return options.sort(() => Math.random() - 0.5);
  }

  // to get quiz title based on type
  function getQuizTitle(type) {
    return type === "multiple" ? "Multiple Choice Quiz" : "True / False Quiz";
  }

  // to handle skipping to the next question
  function handleSkip() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimer(type === "multiple" ? 10 : 8);
      setSelectedOptions([]);
    } else {
      setQuizCompleted(true);
      calculateScore();
    }
  }

  // to handle going back to the previous question
  function handlePrev() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setSelectedOptions([]);
    }
  }

  // to handle selecting an option
  function handleOptionSelect(option) {
    if (type === "multiple") {
      if (selectedOptions.includes(option)) {
        // If the option is already selected, remove it
        setSelectedOptions((prevOptions) =>
          prevOptions.filter((item) => item !== option)
        );
      } else {
        // If the option is not selected, add it to the list of selected options
        // Remove the previously selected option, if any, and add the current one
        setSelectedOptions([option]);
      }
    } else if (type === "truefalse") {
      // For true/false questions, only allow selecting one option
      setSelectedOptions([option]);
    }
  }

  // to calculate quiz score
  function calculateScore() {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      const correctOption = question.options.find(
        (option) => option === question.correct_answer
      );
      if (selectedOptions.includes(correctOption)) {
        correctAnswers++;
      }
    });
    setScore((correctAnswers / questions.length) * 100);
  }

  // to handle quiz completion
  function handleComplete() {
    setQuizCompleted(true);
    calculateScore();
  }

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-evenly gap-4 h-96">
      <h2 className="text-gray-500 uppercase text-2xl text-center">
        {quizTitle}
      </h2>
      {/* Render current question and controls if quiz not completed */}
      {!quizCompleted && currentQuestion && (
        <>
          <Question
            currentQuestion={currentQuestion}
            timer={timer}
            type={type}
            selectedOptions={selectedOptions}
            handleOptionSelect={handleOptionSelect}
          />
          <Controls
            handlePrev={handlePrev}
            handleSkip={handleSkip}
            handleComplete={handleComplete}
            currentQuestionIndex={currentQuestionIndex}
            questionsLength={questions.length}
          />
        </>
      )}
      {/* Render quiz completion message if quiz completed */}
      {quizCompleted && (
        <h1 className="text-5xl text-slate-600">
          Quiz Completed! Your score:{" "}
          <span className="text-green-400">{score}%</span>
        </h1>
      )}
    </div>
  );
}

export default Quiz;
