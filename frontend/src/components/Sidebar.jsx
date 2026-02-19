import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Sidebar = () => {
  const navigate = useNavigate();
  const logoutHandler = async() => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`)
      navigate('/login');
      toast.success(res.data.success)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className="w-[30%] min-w-[280px] h-full flex flex-col 
                    bg-slate-900 border-r border-slate-800 p-4">

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-white mb-4">
        Chats
      </h2>

      {/* Search */}
      <form className="flex items-center bg-slate-800 rounded-lg px-3 py-2 gap-2
                       focus-within:ring-2 focus-within:ring-indigo-500 transition">

        <input
          type="text"
          placeholder="Search users..."
          className="flex-1 bg-transparent outline-none text-white text-sm"
        />

        <button
          type="submit"
          className="text-gray-400 hover:text-white transition"
        >
          <BiSearchAlt2 className="w-5 h-5" />
        </button>
      </form>

      {/* 🔥 Dynamic Users */}
      <OtherUsers />

      {/* Logout */}
      <button onClick={logoutHandler} className="mt-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition text-white">
        Logout
      </button>

    </div>
  );
};

export default Sidebar;
