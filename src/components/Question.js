import React from "react";

function Question({
  currentQuestion,
  timer,
  type,
  selectedOptions,
  handleOptionSelect,
}) {
  const options = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ];

  return (
    <div className="mt-8 w-full max-w-md border rounded-md shadow-md">
      <div className="p-6">
        <p className="text-gray-600 ">
          Time Left: <span className="text-blue-800">{timer}</span> sec
        </p>
        <p className="font-medium text-lg mt-4">{currentQuestion.question}</p>
        <ul className="mt-4 gap-4">
          {options.map((option, index) => (
            <li key={index} className="flex items-center">
              {type === "multiple" ? (
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionSelect(option)}
                />
              ) : (
                <input
                  type="radio"
                  value={option}
                  checked={selectedOptions[0] === option}
                  onChange={() => handleOptionSelect(option)}
                />
              )}
              <span className="ml-2">{option}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Question;
