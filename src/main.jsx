import React from "react";
import headerImg from "./assets/quiz-logo.png";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <header>
      <img src={headerImg} alt="notebook image" />
      <h1>reactquiz</h1>
    </header>
    <App />
  </>
);
