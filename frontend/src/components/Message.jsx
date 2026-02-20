import React from "react";
import { useSelector } from "react-redux";

const formatMessageTime = (dateValue) => {
  if (!dateValue) return "";

  const date = new Date(dateValue);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

function Message({ message }) {
  const { authUser } = useSelector((store) => store.user);

  const senderId = message?.senderId?.toString?.() || message?.senderId;
  const authId = authUser?._id?.toString?.() || authUser?._id;
  const isOwnMessage = senderId === authId;

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm break-words shadow border ${
          isOwnMessage
            ? "bg-cyan-600/95 text-white rounded-br-md border-cyan-400/30"
            : "bg-slate-700/95 text-white rounded-bl-md border-slate-600/60"
        }`}
      >
        <p>{message?.message}</p>
        <p className="mt-1 text-[10px] text-right opacity-80">{formatMessageTime(message?.createdAt)}</p>
      </div>
    </div>
  );
}

export default Message;
