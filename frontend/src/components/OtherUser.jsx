import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import Avatar from "./Avatar";

const normalizeId = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && value._id) return normalizeId(value._id);
  if (typeof value.toString === "function") return value.toString();
  return "";
};

const formatLastSeen = (dateValue) => {
  if (!dateValue) return "Last seen recently";

  const lastSeenDate = new Date(dateValue);
  const now = new Date();
  const diffMs = now.getTime() - lastSeenDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "Last seen just now";
  if (diffMinutes < 60) return `Last seen ${diffMinutes}m ago`;

  const sameDay = now.toDateString() === lastSeenDate.toDateString();
  if (sameDay) {
    return `Last seen today at ${lastSeenDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  return `Last seen ${lastSeenDate.toLocaleDateString()} ${lastSeenDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers, unreadCounts } = useSelector((store) => store.user);

  const userId = normalizeId(user?._id);
  const selectedId = normalizeId(selectedUser?._id);

  const isSelected = selectedId === userId;
  const isOnline = onlineUsers.includes(userId);
  const unreadCount = unreadCounts[userId] || 0;

  const statusText = useMemo(() => {
    if (isOnline) return "Online";
    return formatLastSeen(user?.lastSeen);
  }, [isOnline, user?.lastSeen]);

  const selectedUserHandler = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div
      onClick={selectedUserHandler}
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
        isSelected
          ? "bg-white text-black shadow-md border-white"
          : "text-gray-200 border-transparent hover:bg-slate-800/90 hover:text-white"
      }`}
    >
      <div className="relative">
        <Avatar
          src={user?.profilePhoto}
          name={user?.fullName}
          alt={user?.fullName || "profile"}
          size="md"
        />

        <span
          className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-slate-900 rounded-full ${
            isOnline ? "bg-green-500" : "bg-gray-500"
          }`}
        ></span>
      </div>

      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3
            className={`font-semibold text-sm tracking-wide truncate ${
              isSelected ? "text-black" : "text-white"
            }`}
          >
            {user?.fullName}
          </h3>

          {unreadCount > 0 ? (
            <span className="min-w-6 px-2 h-6 rounded-full bg-cyan-500 text-slate-950 text-xs font-semibold flex items-center justify-center">
              {unreadCount}
            </span>
          ) : null}
        </div>

        <p className={`text-xs truncate ${isSelected ? "text-gray-700" : "text-gray-400"}`}>
          {statusText}
        </p>
      </div>
    </div>
  );
};

export default OtherUser;
