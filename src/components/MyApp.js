'use client'
import React, { useEffect , useState } from "react";
import { connect, sendMsg } from "../app/api";
import Header from './Header.js';
import ChatHistory from "./ChatHistory.js";
import ChatInput from "./ChatInput.js";
export default function MyApp() {
  const [chatHistory, setChatHistory] = useState([]);
  useEffect(() => {
    connect((msg) => {
      console.log(msg);
      console.log("New Message")
      setChatHistory((prevHistory) => [...prevHistory, msg.data]);
    });
  }, []);
  useEffect(() => {
    console.log("Updated chatHistory:", chatHistory);
  }, [chatHistory]);

  const send = (event => {
    if(event.keyCode === 13) {
      sendMsg(event.target.value);
      event.target.value = "";
    }
  });

  return (
    <div className="App">
      <Header></Header>
      <ChatHistory chatHistory={chatHistory} />
      <ChatInput send={send} />
    </div>
  );
};