import React from "react";
import { useSelector } from "react-redux";

function Message({ message }) {
  const { authUser } = useSelector((store) => store.user);
  const isOwnMessage = message?.senderId === authUser?._id;

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm break-words ${
          isOwnMessage
            ? "bg-indigo-600 text-white rounded-br-md"
            : "bg-slate-700 text-white rounded-bl-md"
        }`}
      >
        {message?.message}
      </div>
    </div>
  );
}

export default Message;
