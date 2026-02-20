import React, { useMemo } from "react";
import { HiVideoCamera } from "react-icons/hi2";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";

const formatLastSeen = (dateValue) => {
  if (!dateValue) return "last seen recently";

  const lastSeenDate = new Date(dateValue);
  const now = new Date();
  const diffMs = now.getTime() - lastSeenDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "last seen just now";
  if (diffMinutes < 60) return `last seen ${diffMinutes}m ago`;

  const sameDay = now.toDateString() === lastSeenDate.toDateString();
  if (sameDay) {
    return `last seen today at ${lastSeenDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  return `last seen ${lastSeenDate.toLocaleDateString()} ${lastSeenDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const MessageContainer = () => {
  const { selectedUser, otherUsers, onlineUsers, unreadCounts, authUser } = useSelector(
    (store) => store.user
  );

  const selectedUserId = selectedUser?._id;
  const selectedUserFromList = otherUsers?.find((user) => user._id === selectedUserId);
  const activeUser = selectedUserFromList || selectedUser;
  const isOnline = activeUser?._id ? onlineUsers.includes(activeUser._id) : false;

  const totalUnread = useMemo(
    () => Object.values(unreadCounts).reduce((sum, count) => sum + count, 0),
    [unreadCounts]
  );

  const openVideoCall = () => {
    if (!authUser?._id || !activeUser?._id) return;

    const roomId = [authUser._id, activeUser._id].sort().join("-");
    const callUrl = `https://meet.jit.si/chatapp-${roomId}`;
    window.open(callUrl, "_blank", "noopener,noreferrer");
  };

  const statusText = isOnline ? "Online" : formatLastSeen(activeUser?.lastSeen);

  return (
    <section className="flex-1 flex flex-col bg-slate-900/50 h-[62%] md:h-full">
      <div className="p-4 border-b border-slate-700 text-white font-semibold flex items-center justify-between gap-3 min-h-[72px] bg-slate-900/80 backdrop-blur">
        {activeUser ? (
          <div className="flex items-center gap-3 min-w-0">
            <Avatar
              src={activeUser.profilePhoto}
              name={activeUser.fullName}
              alt={activeUser.fullName}
              size="sm"
            />
            <div className="min-w-0">
              <p className="truncate">{activeUser.fullName}</p>
              <p className="text-xs font-normal text-slate-400 truncate">{statusText}</p>
            </div>
          </div>
        ) : (
          <p>Select a user to start chatting</p>
        )}

        {activeUser ? (
          <button
            onClick={openVideoCall}
            className="px-3 py-2 rounded-lg text-sm bg-cyan-600 hover:bg-cyan-500 transition flex items-center gap-2"
            title="Start video call"
          >
            <HiVideoCamera className="text-lg" />
            <span className="hidden sm:inline">Video call</span>
          </button>
        ) : null}
      </div>

      {totalUnread > 0 ? (
        <div className="px-4 py-2 border-b border-cyan-600/30 bg-cyan-500/10 text-cyan-200 text-sm">
          {totalUnread} new message{totalUnread > 1 ? "s" : ""} waiting in your chats
        </div>
      ) : null}

      <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-slate-900/40 to-slate-900/10">
        {activeUser ? (
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
