import { createContext, useState } from "react";
import runChat, { formatResponse } from "../config/gemini";

const PromptContext = createContext({
  prompt: "",
  setPrompt: () => {},
  onPromptSubmit: (prompt) => {},
  startConversation: "",
  conversation: "",
  response: "",
});

export const PromptContextProvider = (props) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const [conversation, setConversation] = useState([]);
  const [startConversation, setStartConversation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [recentPrompt, setRecentPrompt] = useState("");
  // const [recentPrompts, setRecentPrompts] = useState([]);

  const TypeReponse = (string) => {
    const stringArray = string.split(" ");
    for (let i = 0; i < stringArray.length; i++) {
      setTimeout(() => {
        setResponse((prev) => prev + " " + stringArray[i]);
      }, 50 * i);
    }
  };

  const promptSubmitHandler = async () => {
    setConversation((prev) => [...prev, prompt]);
    setStartConversation(true);
    setIsLoading(true);
    setPrompt("");
    setResponse("");

    let result = await runChat(prompt);
    result = formatResponse(result);
    setIsLoading(false);
    setConversation((prev) => [...prev, result]);
    TypeReponse(result);
  };

  return (
    <PromptContext.Provider
      value={{
        prompt,
        setPrompt,
        onPromptSubmit: promptSubmitHandler,
        response,
        conversation,
        startConversation,
        isLoading,
      }}
    >
      {props.children}
    </PromptContext.Provider>
  );
};

export default PromptContext;
