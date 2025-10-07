import { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import QuestionsContext from "./store/questionsContext";
import Result from "./components/Result";

function App() {
  const [isQuizDone, setIsQuizDone] = useState(false);
  function handleQuizEnd() {
    setIsQuizDone(true);
  }
  return (
    <QuestionsContext>
      <div>
        {isQuizDone ? (
          <Result />
        ) : (
          <QuestionCard handleQuizEnd={handleQuizEnd} />
        )}
      </div>
    </QuestionsContext>
  );
}

export default App;
