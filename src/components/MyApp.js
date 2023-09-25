'use client'
import React, { useEffect , useState } from "react";
import { connect, sendMsg } from "../app/api";
import Header from './Header.js';
import ChatHistory from "./ChatHistory.js";
import ChatInput from "./ChatInput.js";
import axios from "axios";
import { useRouter } from 'next/navigation';
import {localhost} from "../src/app/api/local.js"
export default function MyApp() {
  const [chatHistory, setChatHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Check for the presence of the "username" cookie
    const usernameCookie = document.cookie.includes('username=');

    // If the "username" cookie is not present, redirect to the login page
    if (!usernameCookie) {
      router.push('/login'); // Replace with your actual login route
    }

    // ... Rest of your useEffect logic

  }, []);
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('http://'+localhost+':8080/chat-history');
        console.log(response.data);

       const formattedHistory = response.data.map((item) => ({
          body: item.content,
          sender: item.sender
        }));

        setChatHistory((prevHistory) => [...prevHistory, ...formattedHistory]);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchChatHistory();
  }, []);

  useEffect(() => {
    connect((msg) => {
      console.log(msg);
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