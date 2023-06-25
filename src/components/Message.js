// src/components/Message/Message.jsx
import React from "react";
import "./Message.scss";

export default function Message({ message }){
  const temp = JSON.parse(message);

  return <div className="Message">{temp.body}</div>;
};

