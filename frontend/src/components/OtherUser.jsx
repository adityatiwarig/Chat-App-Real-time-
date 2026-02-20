import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import Avatar from "./Avatar";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);

  const isSelected = selectedUser?._id === user?._id;
  const isOnline = onlineUsers.includes(user?._id);

  const selectedUserHandler = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div
      onClick={selectedUserHandler}
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
        isSelected
          ? "bg-white text-black shadow-md"
          : "text-gray-200 hover:bg-slate-800/90 hover:text-white"
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

      <div className="flex flex-col min-w-0">
        <h3
          className={`font-semibold text-sm tracking-wide truncate ${
            isSelected ? "text-black" : "text-white"
          }`}
        >
          {user?.fullName}
        </h3>

        <p className={`text-xs ${isSelected ? "text-gray-700" : "text-gray-400"}`}>
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default OtherUser;
