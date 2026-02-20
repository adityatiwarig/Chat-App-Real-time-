import React from "react";
import { useSelector } from "react-redux";

function Message({ message }) {
  const { authUser } = useSelector((store) => store.user);

  const senderId = message?.senderId?.toString?.() || message?.senderId;
  const authId = authUser?._id?.toString?.() || authUser?._id;
  const isOwnMessage = senderId === authId;

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm break-words shadow ${
          isOwnMessage
            ? "bg-cyan-600 text-white rounded-br-md"
            : "bg-slate-700 text-white rounded-bl-md"
        }`}
      >
        {message?.message}
      </div>
    </div>
  );
}

export default Message;
