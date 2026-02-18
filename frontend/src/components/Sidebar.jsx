import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const Sidebar = () => {
  return (
    <div className="w-[30%] min-w-[280px] h-full flex flex-col 
                    bg-slate-900 border-r border-slate-800 p-4">

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-white mb-4">
        Chats
      </h2>

      {/* Search Form */}
      <form className="flex items-center bg-slate-800 rounded-lg px-3 py-2 gap-2
                       focus-within:ring-2 focus-within:ring-indigo-500 transition">

        <input
          type="text"
          placeholder="Search..."
          className="flex-1 bg-transparent outline-none text-white text-sm"
        />

        <button
          type="submit"
          className="text-gray-400 hover:text-white transition"
        >
          <BiSearchAlt2 className="w-5 h-5" />
        </button>

      </form>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto mt-4 space-y-2">

        {["Rahul", "Priya", "Aman", "Sneha"].map((name, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-xl 
                       cursor-pointer hover:bg-slate-800 transition duration-200"
          >
            <div className="relative">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFFbBnDucTQkErvyNTrqFvqD4eSkm9UcFNYg&s"
                alt="profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                               border-2 border-slate-900 rounded-full"></span>
            </div>

            <div>
              <h3 className="text-white font-medium">{name}</h3>
              <p className="text-sm text-gray-400">Online</p>
            </div>
          </div>
        ))}

      </div>

      {/* Logout */}
      <button className="mt-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition text-white">
        Logout
      </button>

    </div>
  );
};

export default Sidebar;
