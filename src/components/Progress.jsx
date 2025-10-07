import { useEffect, useState } from "react";
import { questionsCTX } from "../store/questionsContext";

const Progress = ({
  currentMaxTime,
  progressState,
  remainingTime,
  setRemainingTime,
  handleProgressTimeout,
}) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prev) => prev - 10);
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, [progressState]);

  useEffect(() => {
    const timerId = setTimeout(handleProgressTimeout, currentMaxTime);
    return () => {
      clearTimeout(timerId);
    };
  }, [progressState]);

  return (
    <progress
      value={remainingTime}
      max={currentMaxTime * 1}
      className={`question-time ${
        progressState === "checking" ? "answered" : ""
      }`}
    />
  );
};

export default Progress;
