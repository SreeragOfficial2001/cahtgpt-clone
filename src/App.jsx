import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user.jpg';
import gptImgLogo from './assets/chatgptLogo.svg';
import { sendMsgToGemini } from './openai';

const App = () => {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "What can I help with?", isBot: true }
  ]);

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToGemini(text);
    setMessages([...messages, { text, isBot: false }, { text: res, isBot: true }]);
  };

  const handleEnter = async (e) => {
    if (e.key === 'Enter') await handleSend();
  };

  const handleQuery = async (e) => {
    const text = e.target.value;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToGemini(text);
    setMessages([...messages, { text, isBot: false }, { text: res, isBot: true }]);
  };

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="ChatGPT Logo" className='logo' />
            <span className='brand'>SREERAG AI</span>
          </div>

          <button className="midBtn" onClick={() => window.location.reload()}>
            <img src={addBtn} alt="Add" className='addBtn' />
            NEW CHAT
          </button>

          <div className="upperSideBottom">
            <button className="query" value={" What is programming ?"} onClick={handleQuery}>
              <img src={msgIcon} alt="Query Icon" />
              What is programming ?
            </button>
            <button className="query" value={"How to use an API ?"} onClick={handleQuery}>
              <img src={msgIcon} alt="Query Icon" />
              How to use an API ?
            </button>
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="Home" className='listItemsImg' />Home</div>
          <div className="listItems"><img src={saved} alt="Saved" className='listItemsImg' />Saved</div>
          <div className="listItems"><img src={rocket} alt="Upgrade" className='listItemsImg' />Upgrade to Pro</div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          {messages.map((message, i) =>
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img className='chatimg' src={message.isBot ? gptImgLogo : userIcon} alt="" />
              <p className="txt">{message.text}</p>
            </div>
          )}
          <div ref={msgEnd} />
        </div>

        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder='Send a message...'
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="" />
            </button>
          </div>
          <p>ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT August 20 Version.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
