import React, { useMemo, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearChatState, setAuthUser } from "../redux/userSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const trimmedSearch = useMemo(() => search.trim(), [search]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`);
      dispatch(setAuthUser(null));
      dispatch(clearChatState());
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <aside className="w-full md:w-[34%] min-w-[280px] h-[38%] md:h-full flex flex-col bg-slate-950/70 border-b md:border-b-0 md:border-r border-slate-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white">Chats</h2>
        <span className="text-xs text-slate-400">Realtime</span>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center bg-slate-800 rounded-lg px-3 py-2 gap-2 focus-within:ring-2 focus-within:ring-cyan-500 transition"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="flex-1 bg-transparent outline-none text-white text-sm"
        />

        <button type="submit" className="text-gray-400 hover:text-white transition">
          <BiSearchAlt2 className="w-5 h-5" />
        </button>
      </form>

      <OtherUsers searchTerm={trimmedSearch} />

      <button
        onClick={logoutHandler}
        className="mt-4 py-2 bg-rose-500 rounded-lg hover:bg-rose-600 transition text-white"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
