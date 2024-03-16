import React from "react";
import {
  BiSolidSkipPreviousCircle,
  BiSolidSkipNextCircle,
} from "react-icons/bi";

function Controls({
  handlePrev,
  handleSkip,
  handleComplete,
  currentQuestionIndex,
  questionsLength,
}) {
  return (
    <div className="flex justify-evenly w-2/3">
      <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
        <BiSolidSkipPreviousCircle className="text-5xl text-red-400 hover:bg-red-400 hover:text-white hover:rounded-full" />
      </button>

      {currentQuestionIndex === questionsLength - 1 && (
        <button
          className="bg-black text-white p-4 rounded"
          onClick={handleComplete}
        >
          Complete!!!
        </button>
      )}

      <button onClick={handleSkip}>
        <BiSolidSkipNextCircle className="text-5xl text-green-400 hover:bg-green-400 hover:text-white hover:rounded-full" />
      </button>
    </div>
  );
}

export default Controls;
