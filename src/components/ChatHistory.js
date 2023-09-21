import React, { useRef, useEffect } from "react";
import "./ChatHistory.scss";
import Message from "./Message";

export default function ChatHistory({ chatHistory }) {
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    console.log("chatHistory:", chatHistory);

    const messages = chatHistory.map((msg, index) => {
        console.log("Message:", msg);
        return <Message message={msg} key={index} />;
    });

    return (
      <div className="ChatHistory">
        <h2>Chat History</h2>
        {messages}
        <div ref={endOfMessagesRef} />
      </div>
    );
}
