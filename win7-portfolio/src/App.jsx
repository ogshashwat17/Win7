import React, { useState } from 'react';
import DesktopIcons from './Components/DesktopIcons';
import Taskbar from './Components/Taskbar';
import FileExplorer from './Components/FileExplorer';
import StartMenu from './Components/StartMenu';

const icons = [
  { name: "User", icon: "computer-removebg-preview.png" }, 
  { name: "Games", icon: "games_icon-removebg-preview.png" },
  { name: "Social", icon: "social-removebg-preview.png" },
  { name: "Message", icon: "windows-message-removebg-preview.png" },
  { name: "About Me", icon: "user-removebg-preview.png" }
];

function App() {
  const [openWindow, setOpenWindow] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);

  const handleIconClick = (name) => {
    if (openWindow === name && isMinimized) {
      setIsMinimized(false);
    } else {
      setOpenWindow(name);
      setIsMinimized(false);
    }
  };

  const handleOpen = (name) => {
    setOpenWindow(name);
    setIsMinimized(false);
  };

  return (
    <div className="h-screen w-screen bg-[url('/win7wallpaper.jpg')] bg-cover bg-center relative overflow-hidden">
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-6">
        {icons.map((icon, i) => (
          <DesktopIcons
            key={i}
            name={icon.name}
            icon={icon.icon}
            onClick={() => handleIconClick(icon.name)}
          />
        ))}
      </div>

      {/* File Explorer for open window */}
      {openWindow && !isMinimized && (
        <FileExplorer
          iconName={openWindow}
          onClose={() => {
            setOpenWindow(null);
            setIsMinimized(false);
          }}
          onMinimize={() => setIsMinimized(true)}
          onOpenProjects={() => setProjectsOpen(true)}
        />
      )}

      {/* Separate File Explorer for Projects */}
      {projectsOpen && (
        <FileExplorer
          iconName="Projects"
          onClose={() => setProjectsOpen(false)}
          onMinimize={() => setProjectsOpen(false)}
        />
      )}

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu
          handleOpen={(name) => {
            handleOpen(name);
            setShowStartMenu(false);
          }}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        openWindow={openWindow}
        isMinimized={isMinimized}
        onClickTaskbarIcon={() => {
          if (openWindow) setIsMinimized((prev) => !prev);
        }}
        onStartClick={() => setShowStartMenu((prev) => !prev)}
        taskbarIcon={icons.find((icon) => icon.name === openWindow)}
      />
    </div>
  );
}

export default App;
