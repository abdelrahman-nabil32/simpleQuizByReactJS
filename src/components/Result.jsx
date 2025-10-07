import { useContext, useEffect } from "react";
import originalQuestions from "../assets/questions";
import { questionsCTX } from "../store/questionsContext";
import resultImg from "../assets/quiz-complete.png";

const Result = () => {
  const questionCTX = useContext(questionsCTX);

  const numOfSkippedQuestions = questionCTX.questionsInteractionsInfo.reduce(
    (acc, { chosenAns }) => (chosenAns === null ? acc + 1 : acc),
    0
  );
  const numOfCorrectAns = questionCTX.questionsInteractionsInfo.reduce(
    (acc, { chosenAns }, index) =>
      chosenAns === originalQuestions[index].correctAns * 1 ? acc + 1 : acc,
    0
  );

  return (
    <div id="summary">
      <img src={resultImg} alt="image of winning cup" />
      <h2>quiz completed!</h2>
      <div id="summary-stats">
        <div>
          <p className="number">
            {((numOfSkippedQuestions / originalQuestions.length) * 100).toFixed(
              0
            )}
            %
          </p>
          <p className="text">skipped</p>
        </div>
        <div>
          <p className="number">
            {((numOfCorrectAns / originalQuestions.length) * 100).toFixed(0)}%
          </p>
          <p className="text">Answered Corrrectly</p>
        </div>
        <div>
          <p className="number">
            {(
              ((originalQuestions.length -
                (numOfCorrectAns + numOfSkippedQuestions)) /
                originalQuestions.length) *
              100
            ).toFixed(0)}
            %
          </p>
          <p className="text">Answered Incorrectly</p>
        </div>
      </div>
      <ol>
        {questionCTX.questionsInteractionsInfo.map(({ chosenAns }, index) => {
          return (
            <li key={originalQuestions[index].id}>
              <p className="question">{originalQuestions[index].text}</p>
              <p
                className={`user-answer ${
                  chosenAns === null
                    ? "skipped"
                    : chosenAns * 1 === originalQuestions[index].correctAns * 1
                    ? "correct"
                    : "wrong"
                }`}
              >
                {chosenAns === null
                  ? originalQuestions[index].answers[
                      originalQuestions[index].correctAns
                    ]
                  : originalQuestions[index].answers[chosenAns]}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Result;
