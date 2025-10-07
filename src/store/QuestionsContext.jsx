import { createContext, useReducer } from "react";

export const questionsCTX = createContext({
  questionsInteractionsInfo: [],
  questionsInteractionsInfoDispatch: () => {},
});

function handleDispatch(state, action) {
  if (action.type === "ADD_QUESTION_INFO") {
    return [...state, { chosenAns: action.payload }];
  }
  return state;
}

const QuestionsContext = ({ children }) => {
  const [questionsInteractionsInfo, questionsInteractionsInfoDispatch] =
    useReducer(handleDispatch, []);

  return (
    <questionsCTX.Provider
      value={{ questionsInteractionsInfo, questionsInteractionsInfoDispatch }}
    >
      {children}
    </questionsCTX.Provider>
  );
};

export default QuestionsContext;
