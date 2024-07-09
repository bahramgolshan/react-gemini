import { useContext, useRef, useEffect } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import PromptContext from "../../context/prompt-context";

const Main = () => {
  const {
    prompt,
    setPrompt,
    onPromptSubmit,
    response,
    conversation,
    startConversation,
    isLoading,
  } = useContext(PromptContext);

  const messagesEndRef = useRef();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [response]);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!startConversation && (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Tell me about React js and React native</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        )}
        <div className="result">
          {startConversation &&
            conversation.map((value, index) => {
              return index % 2 === 0 ? (
                <div key={index} className="result-title">
                  <img src={assets.user_icon} alt="" />
                  <p>{value}</p>
                </div>
              ) : (
                <div key={index} className="result-data">
                  <img src={assets.gemini_icon} alt="" />
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        index === conversation.length - 1 ? response : value,
                    }}
                  ></p>
                </div>
              );
            })}

          <div ref={messagesEndRef} />
        </div>

        <div className="main-bottom">
          <div className="search-box">
            <input
              value={prompt}
              type="text"
              placeholder="Enter a prompt here"
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onPromptSubmit()}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {prompt && (
                <img
                  src={assets.send_icon}
                  alt=""
                  onClick={() => onPromptSubmit()}
                />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
