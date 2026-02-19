import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";

const MessageContainer = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-800 h-full">

      {/* Header */}
      <div className="p-4 border-b border-slate-700 text-white font-semibold">
        Rahul
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">

        <div className="bg-slate-700 text-white p-3 rounded-lg w-fit">
          Hello 👋
        </div>

        <div className="bg-indigo-600 text-white p-3 rounded-lg w-fit ml-auto">
          Hi bro 🔥
        </div>

      </div>
      <Messages/>

      {/* Input */}
      <div className="p-4 border-t border-slate-700 bg-slate-800 relative z-10">
        <SendInput />
        
      </div>
      

    </div>
  );
};

export default MessageContainer;
