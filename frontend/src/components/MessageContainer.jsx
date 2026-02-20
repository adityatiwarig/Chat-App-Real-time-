import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedUser } = useSelector((store) => store.user);

  return (
    <div className="flex-1 flex flex-col bg-slate-800 h-full">
      <div className="p-4 border-b border-slate-700 text-white font-semibold">
        {selectedUser ? selectedUser.fullName : "Select a user to start chatting"}
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {selectedUser ? (
          <Messages />
        ) : (
          <p className="text-slate-400 text-sm">Choose someone from the sidebar.</p>
        )}
      </div>

      <div className="p-4 border-t border-slate-700 bg-slate-800 relative z-10">
        <SendInput />
      </div>
    </div>
  );
};

export default MessageContainer;
