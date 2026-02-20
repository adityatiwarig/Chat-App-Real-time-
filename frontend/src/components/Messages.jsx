import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";

function Messages() {
  useGetMessages();
  const { messages, selectedUser } = useSelector((store) => store.user);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedUser?._id]);

  if (!messages?.length) {
    return <p className="text-slate-400 text-sm">No messages yet.</p>;
  }

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

export default Messages;
