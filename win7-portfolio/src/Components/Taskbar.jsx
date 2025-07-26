import React, { useState, useEffect } from "react";
import TimeDate from "./TimeDate";
import StartMenu from "./StartMenu";

function Taskbar({ openWindow, isMinimized, onClickTaskbarIcon, taskbarIcon }) {
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest("#start-menu") &&
        !e.target.closest("#start-button")
      ) {
        setStartOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {startOpen && <StartMenu />}

      <div className="fixed bottom-0 left-0 w-full h-14 px-4 flex items-center justify-between z-[10000]
                      bg-[rgba(255,255,255,0.05)] backdrop-blur-md border-t border-white/20 shadow-inner">
        <div className="flex items-center gap-2">
          {/* Start Button */}
          <img
            id="start-button"
            src="/window7startbutton.jpg"
            alt="Start"
            className="h-10 w-10 rounded-full object-cover shadow-md cursor-pointer"
            onClick={() => setStartOpen((prev) => !prev)}
          />

          {/* Taskbar App Icon */}
          {openWindow && taskbarIcon && (
            <button
              className={`h-10 w-10 rounded-md overflow-hidden border border-white/20 shadow-md ${
                isMinimized ? "opacity-50" : "opacity-100"
              }`}
              onClick={onClickTaskbarIcon}
            >
              <img
                src={`/${taskbarIcon.icon}`} // Assuming your icons are in public folder
                alt={taskbarIcon.name}
                className="w-full h-full object-cover"
              />
            </button>
          )}
        </div>

        
        <TimeDate />
      </div>
    </>
  );
}

export default Taskbar;

