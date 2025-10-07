import { useContext, useState } from "react";
import questions from "../assets/questions";
import Progress from "./Progress";
import { questionsCTX } from "../store/questionsContext";

const waitingTime = 30000;
const non_waitingTime = 2000;

const QuestionCard = ({ handleQuizEnd }) => {
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [clickedButton, setClickedButton] = useState(null);
  const [progressState, setProgressState] = useState("waiting"); //it could be either "waiting" ,"checking" or "revealing"
  const questionCTX = useContext(questionsCTX);

  function handleSwitchingToNextQuestion() {
    if (currentQuestionId < questions.length - 1) {
      setCurrentQuestionId((prev) => prev + 1);
    } else {
      handleQuizEnd();
    }
  }
  function handleProgressTimeout() {
    if (progressState === "waiting") {
      questionCTX.questionsInteractionsInfoDispatch({
        type: "ADD_QUESTION_INFO",
        payload: null,
      });
      setProgressState("revealing");
    } else if (progressState === "checking") {
      setProgressState("revealing");
    } else if (progressState === "revealing") {
      setProgressState("waiting");
      setClickedButton(null);
      handleSwitchingToNextQuestion();
    }
  }
  function handleAnswerButtonClick(buttonId) {
    setClickedButton(buttonId);
    questionCTX.questionsInteractionsInfoDispatch({
      type: "ADD_QUESTION_INFO",
      payload: buttonId * 1,
    });
    setProgressState("checking");
  }

  return (
    <div id="quiz">
      <div id="question">
        <Progress
          key={progressState}
          currentMaxTime={
            progressState === "waiting" ? waitingTime : non_waitingTime
          }
          progressState={progressState}
          handleProgressTimeout={handleProgressTimeout}
        />
        <h2>{questions[currentQuestionId].text}</h2>
        <ul id="answers">
          {questions[currentQuestionId].answers.map((ans, index) => {
            return (
              <li key={index} className="answer">
                <button
                  id={index}
                  onClick={() => {
                    handleAnswerButtonClick(index);
                  }}
                  disabled={
                    clickedButton !== null || progressState !== "waiting"
                  }
                  className={
                    index === clickedButton
                      ? progressState === "checking"
                        ? "selected"
                        : progressState === "revealing" &&
                          index ===
                            questions[
                              questionCTX.questionsInteractionsInfo.length - 1
                            ].correctAns *
                              1
                        ? "correct"
                        : "wrong"
                      : ""
                  }
                >
                  {ans}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default QuestionCard;
