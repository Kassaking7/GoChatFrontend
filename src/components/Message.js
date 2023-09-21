// src/components/Message/Message.jsx
import React from "react";
import "./Message.scss";

export default function Message({ message }){
  const temp = (typeof message != "object")? JSON.parse(message): message;

  return (
        <div className="Message">
      <div className="Sender">{temp.sender}</div>
      <div className="Body">{temp.body}</div>
    
    </div>);
};

