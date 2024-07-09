import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PromptContextProvider } from "./context/prompt-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PromptContextProvider>
    <App />
  </PromptContextProvider>
);
