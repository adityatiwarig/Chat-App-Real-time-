import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

function SendInput() {
  const [text, setText] = useState("");

  return (
    <form 
      onSubmit={(e) => e.preventDefault()} 
      className="flex items-center gap-2"
    >

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-slate-700 text-white 
                   px-4 py-2 rounded-lg 
                   outline-none
                   transition-all duration-300
                   focus:ring-2 focus:ring-indigo-500
                   hover:scale-[1.02]"
      />

      <button
        type="button"
        className="bg-indigo-600 p-3 rounded-lg 
                   transition-all duration-300
                   hover:bg-indigo-700
                   hover:scale-110
                   active:scale-95
                   flex items-center justify-center"
      >
        <FiSend className="text-white text-lg" />
      </button>

    </form>
  );
}

export default SendInput;
