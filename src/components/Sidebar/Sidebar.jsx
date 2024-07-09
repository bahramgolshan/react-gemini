import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import PromptContext from "../../context/prompt-context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { conversation } = useContext(PromptContext);

  const handleMenuClick = () => {
    setExtended((prev) => !prev);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt=""
          onClick={handleMenuClick}
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className="recent">
            <div className="recent-title">Recent</div>
            {conversation.length > 0 && (
              <div className="recent-entry">
                <img src={assets.message_icon} alt="" />
                <p>{conversation[0].slice(0, 20)}...</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="botton-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended && <p>Help</p>}
        </div>
        <div className="botton-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended && <p>Activity</p>}
        </div>
        <div className="botton-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
