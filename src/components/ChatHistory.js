import React, { Component } from "react";
import "./ChatHistory.scss";
import Message from "./Message";
export default function ChatHistory({ chatHistory }) {
    console.log("chatHistory:", chatHistory);

    const messages = chatHistory.map((msg, index) => {
        console.log("Message:", msg);
        return <Message message={msg} />;
    });

    return (
      <div className="ChatHistory">
        <h2>Chat History</h2>
        {messages}
      </div>
    );
}