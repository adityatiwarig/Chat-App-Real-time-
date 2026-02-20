import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";

const MessageContainer = () => {
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = selectedUser?._id ? onlineUsers.includes(selectedUser._id) : false;

  return (
    <section className="flex-1 flex flex-col bg-slate-900/50 h-[62%] md:h-full">
      <div className="p-4 border-b border-slate-700 text-white font-semibold flex items-center gap-3 min-h-[72px]">
        {selectedUser ? (
          <>
            <Avatar
              src={selectedUser.profilePhoto}
              name={selectedUser.fullName}
              alt={selectedUser.fullName}
              size="sm"
            />
            <div className="min-w-0">
              <p className="truncate">{selectedUser.fullName}</p>
              <p className="text-xs font-normal text-slate-400">
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-slate-900/40 to-slate-900/10">
        {selectedUser ? (
          <Messages />
        ) : (
          <p className="text-slate-400 text-sm">Choose someone from the sidebar.</p>
        )}
      </div>

      <div className="p-4 border-t border-slate-700 bg-slate-900/70">
        <SendInput />
      </div>
    </section>
  );
};

export default MessageContainer;
