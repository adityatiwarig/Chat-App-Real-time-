import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

const HomePage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-slate-950">
      <div className="w-[95%] max-w-6xl h-[90vh] flex rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
        <div className="p-4 border-t border-slate-700 bg-slate-800 relative z-10">
        <Sidebar />
         </div>
        <MessageContainer />
      </div>
    </div>
  );
};

export default HomePage;
