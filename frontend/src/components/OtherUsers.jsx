import React from "react";

const OtherUser = ({ name }) => {
  return (
    <div className="w-full flex items-center gap-3 p-3 rounded-xl 
                    cursor-pointer hover:bg-slate-800 
                    transition-all duration-200">

      <div className="relative flex-shrink-0">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFFbBnDucTQkErvyNTrqFvqD4eSkm9UcFNYg&s"
          alt="profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                         border-2 border-slate-900 rounded-full"></span>
      </div>

      <div className="flex-1">
        <h3 className="text-white font-medium">{name}</h3>
        <p className="text-sm text-gray-400">Online</p>
      </div>
    </div>
  );
};

export default OtherUser;
