import React, { useState } from "react";

import Quiz from "./Quiz";

function Main() {
  const [selectedType, setSelectedType] = useState(null);

  // Function to handle selection of quiz type
  const handleSelection = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="flex justify-center items-center flex-col ">
      <h1 className="uppercase underline text-slate-500 font-bold text-3xl my-8">
        Quiz App
      </h1>
      {!selectedType && (
        <div className="flex flex-col gap-8 items-center justify-center">
          <p className="text-blue-400 font-semibold text-xl p-4">
            Please select a quiz type Multiple Choice or True / False
          </p>
          <div className="flex  gap-4">
            <button
              className="bg-green-400 text-white hover:text-green-400 hover:bg-white rounded-full p-4"
              onClick={() => handleSelection("multiple")}
            >
              Multiple Choice
            </button>
            <button
              className="bg-green-400 text-white hover:text-green-400 hover:bg-white rounded-full p-4"
              onClick={() => handleSelection("truefalse")}
            >
              True / False
            </button>
          </div>
        </div>
      )}
      {/*  Render Quiz component if quiz type selected */}
      {selectedType && <Quiz type={selectedType} />}
    </div>
  );
}

export default Main;
