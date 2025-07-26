import React, { useState } from "react";

export default function StartMenu({ handleOpen }) {
 {
  const [searchText, setSearchText] = useState("");

  const programs = [
    {
      name: "Paint",
      icon: <img src="paint.jpg" alt="Paint" className="w-full h-full object-contain" />,
    },
    {
      name: "Notes",
      icon: <img src="icons8-notes-40.png" alt="Notes" className="w-full h-full object-contain" />,
    },
    
  ];

  const filteredPrograms = programs.filter((prog) =>
    prog.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleProgramClick = (programName) => {
  if (programName === "Paint") {
    window.open("https://guileless-truffle-398a75.netlify.app", "_blank");
  } else if (programName === "Notes") {
    window.open("https://paste-note-alpha.vercel.app/", "_blank");
  } else {
    handleOpen(programName); 
  }
};


  return (
    <div
      className="fixed left-2 w-[400px] h-[514px] z-[9999] flex overflow-hidden rounded-t-xl shadow-2xl border border-gray-300"
      style={{
        bottom: "50px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* Left Panel */}
      <div
        className="w-2/3 border-r border-gray-300 flex flex-col justify-between p-3"
        style={{ background: "linear-gradient(to bottom, #fefefe, #e3e3e3)" }}
      >
        {/* Program List */}
        <div className="flex-1 overflow-y-auto pr-1">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((prog, idx) => (
              <div
                key={idx}
                onClick={() => handleProgramClick(prog.name)}
                className="flex items-center gap-3 px-3 py-2 mb-3 hover:bg-blue-100 rounded cursor-pointer"
              >
                <div className="w-7 h-7">{prog.icon}</div>
                <span className="text-base font-medium text-black">{prog.name}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 px-2">No results found.</p>
          )}
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search programs and files"
          className="w-full mt-3 px-2 py-1 text-sm border border-gray-300 rounded shadow-inner focus:outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Right Panel */}
      <div
        className="w-1/3 p-2 flex flex-col justify-between backdrop-blur-md border-l border-gray-300"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
      >
        {/* Profile */}
        <div className="flex flex-col items-center">
          <img
            src="user.jpg"
            alt="User"
            className="w-12 h-12 rounded-full mb-1 border border-gray-400 shadow"
          />
          <p className="text-sm font-semibold text-gray-800 text-center">
            Shashwat Srivastava
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1 mt-4 space-y-1 text-sm text-blue-900 overflow-auto">
          {[
           
          ].map((item, idx) => (
            <div
              key={idx}
              className="px-2 py-1 hover:bg-blue-100 rounded cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Shutdown Button */}
        <div className="mt-4 flex justify-end">
          <button className="bg-blue-100 border border-gray-300 text-sm px-3 py-1 rounded hover:bg-blue-200">
            ⏻ Shut down 
          </button>
        </div>
      </div>
    </div>
  );
 }}
