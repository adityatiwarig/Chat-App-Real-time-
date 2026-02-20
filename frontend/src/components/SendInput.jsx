import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/userSlice";
import toast from "react-hot-toast";

function SendInput() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const trimmed = text.trim();

    if (!trimmed || !selectedUser?._id) return;

    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${selectedUser._id}`,
        { message: trimmed }
      );

      if (res.data?.newMessage) {
        dispatch(addMessage(res.data.newMessage));
      }

      setText("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={selectedUser ? "Type a message..." : "Select a user first"}
        disabled={!selectedUser}
        className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
      />

      <button
        type="submit"
        disabled={!selectedUser || !text.trim()}
        className="bg-indigo-600 p-3 rounded-lg transition-all duration-300 hover:bg-indigo-700 active:scale-95 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <FiSend className="text-white text-lg" />
      </button>
    </form>
  );
}

export default SendInput;
