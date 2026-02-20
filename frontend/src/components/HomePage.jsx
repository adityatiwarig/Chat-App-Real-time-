import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-2rem)] flex items-center justify-center">
      <div className="w-full max-w-6xl h-[88vh] flex flex-col md:flex-row rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900/80 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default HomePage;
