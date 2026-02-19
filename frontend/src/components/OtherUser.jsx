import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);

  const isSelected = selectedUser?._id === user?._id;

  const selectedUserHandler = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div
      onClick={selectedUserHandler}
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer
      transition-all duration-200 group
      ${isSelected
        ? "bg-white text-black shadow-md"
        : "text-gray-200 hover:bg-slate-800 hover:text-white"
      }`}
    >
      {/* Profile */}
      <div className="relative">
        <img
          src={user?.profilePhoto || "https://i.pravatar.cc/150"}
          alt="profile"
          className="w-12 h-12 rounded-full object-cover border border-slate-700"
        />

        {/* online dot */}
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                         border-2 border-slate-900 rounded-full"></span>
      </div>

      {/* User Info */}
      <div className="flex flex-col">
        <h3
          className={`font-semibold text-sm tracking-wide ${
            isSelected ? "text-black" : "text-white"
          }`}
        >
          {user?.fullName}
        </h3>

        <p
          className={`text-xs ${
            isSelected ? "text-gray-700" : "text-gray-400"
          }`}
        >
          Online
        </p>
      </div>
    </div>
  );
};

export default OtherUser;
