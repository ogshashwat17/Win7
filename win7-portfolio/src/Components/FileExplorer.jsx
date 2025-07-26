import React, { useState } from "react";
import Games from "./Game";
import MessageForm from "./MessageForm";

export default function FileExplorer({ iconName, onClose, onMinimize }) {
  const [isMaximized, setIsMaximized] = useState(true);
  const [activeIcon, setActiveIcon] = useState(iconName);

  const allIcons = ["Games", "User", "Message", "Social", "About Me",];
  const libraries = allIcons;

  const renderContent = () => {
    switch (activeIcon) {
      case "User":
        const userItems = [
          {
            name: "Resume",
            image: "folder.jpg",
            onClick: () =>
              window.open(
                "https://drive.google.com/drive/folders/1m8geVjMvtO-SL5ARjMrZSIcDo6z0gLNI",
                "_blank"
              ),
          },
          {
            name: "Projects",
            image: "folder.jpg",
            onClick: () => setActiveIcon("Projects"),
          },
        ];

        return (
          <div>
            <h1 className="text-lg font-semibold mb-3">User Profile</h1>
            <div className="flex gap-6">
              {userItems.map((item) => (
                <div
                  key={item.name}
                  onClick={item.onClick}
                  className="flex flex-col items-center p-3 cursor-pointer hover:bg-blue-100 transition rounded"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-contain mb-1"
                  />
                  <div className="text-sm">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        );

 

      case "Projects":
        return (
          <div>
            <h1 className="text-lg font-semibold mb-3">My Projects</h1>
            <div className="flex gap-6">
              <div
                className="flex flex-col items-center p-3 cursor-pointer hover:bg-blue-100 transition rounded"
                onClick={() =>
                  window.open("https://paste-note-alpha.vercel.app/", "_blank")
                }
              >
                <img
                  src="icons8-notes-40.png"
                  alt="Notes"
                  className="w-12 h-12 object-contain mb-1"
                />
                <div className="text-sm">Notes</div>
              </div>
            </div>
          </div>
        );

      case "Games":
        return <Games />;

      case "Social":
        return (
          <div>
            <h1 className="text-lg font-semibold mb-3">Social Links</h1>
            <div className="flex gap-6">
              {[
                {
                  name: "GitHub",
                  image: "githublogo2-removebg-preview.png",
                  link: "https://github.com/ogshashwat17",
                },
                {
                  name: "LinkedIn",
                  image: "linkedin-removebg-preview.png",
                  link:
                    "https://www.linkedin.com/in/shashwat-srivastava-a4b3a1249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                },
                {
                  name: "X",
                  image: "x_logo-removebg-preview.png",
                  link: "https://x.com/Shashwatabd30?t=3DygjbLDUHwH0ChFPHiqNQ&s=09",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center p-3 cursor-pointer hover:bg-blue-100 transition rounded"
                >
                  <img
                    src={social.image}
                    alt={social.name}
                    className="w-12 h-12 object-contain mb-1"
                  />
                  <div className="text-sm">{social.name}</div>
                </a>
              ))}
            </div>
          </div>
        );

      case "Message":
        return <MessageForm />;

    case "About Me":
  return (
    <div>
      <h1 className="text-lg font-semibold">About Me</h1>
      
      <p>
        I'm Shashwat Srivastava, an Electronics and Communication Engineering student at Birla Institute of Technology, Mesra, graduating in 2026. As a passionate full-stack developer, I love building digital experiences that combine functionality and design. I enjoy working across the tech stack—from frontend interfaces to backend systems—and I'm also deeply interested in machine learning, and I’m constantly exploring tech and upskilling myself.
      </p>

     <h2 className="text-lg font-semibold mt-6">Skills</h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 text-sm items-start">
  <div className="space-y-4">
    <div>
      <h3 className="font-medium"> Programming Languages</h3>
      <p>C, C++, Python, TypeScript, SQL</p>
    </div>
    <div>
      <h3 className="font-medium"> Backend & Frameworks</h3>
      <p>NodeJs, ExpressJs, Firebase</p>
    </div>
    <div>
      <h3 className="font-medium"> Databases</h3>
      <p>MySQL, MongoDB, PostgreSQL</p>
    </div>
  </div>

  <div className="space-y-4">
    <div>
      <h3 className="font-medium"> Frontend</h3>
      <p>HTML, CSS, JavaScript, ReactJs, Angular, Shadcn</p>
    </div>
    <div>
      <h3 className="font-medium"> Libraries</h3>
      <p>NumPy, Pandas, Scikit-Learn, PyTorch, Matlab</p>
    </div>
    <div>
      <h3 className="font-medium"> Tools & Platforms</h3>
      <p>Git, GitHub, VS Code</p>
    </div>
  </div>

  <div className="flex justify-center">
    <img
      src="skill photo.jpg" 
      alt="Tech Stack Logos"
      className="rounded-xl shadow-lg w-full max-w-[300px]"
    />
  </div>
</div>

        </div>
    
  );


      default:
        return <p>No content for this icon.</p>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-[Segoe UI]">
      <div
        className={`w-full h-full rounded-none p-[2px] bg-gradient-to-br from-white/40 via-blue-200/20 to-blue-300/30 
          backdrop-blur-2xl backdrop-saturate-200 
          border border-white/30 shadow-xl ring-1 ring-white/20 flex flex-col`}
      >
        {/* Title Bar */}
        <div
          className="flex justify-between items-center px-3 h-9 text-sm font-semibold text-black border-b border-blue-700/30 backdrop-blur-md"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
        >
          <div>{activeIcon} - Explorer</div>
          <div className="flex space-x-1">
            <button
              onClick={onMinimize}
              className="w-7 h-6 hover:bg-gray-200 border border-gray-400 shadow-sm flex items-center justify-center"
            >
              <img src="minimize.jpg" alt="Minimize" className="w-7 h-6" />
            </button>
            <button
              onClick={() => setIsMaximized((prev) => !prev)}
              className="w-7 h-6 hover:bg-gray-200 border border-gray-400 shadow-sm flex items-center justify-center"
            >
              <img src="maximize.jpg" alt="Maximize" className="w-7 h-6" />
            </button>
            <button
              onClick={onClose}
              className="w-7 h-6 hover:bg-red-700 border border-gray-500 flex items-center justify-center"
            >
              <img src="closebutton.jpg" alt="Close" className="w-7 h-6" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="flex-1 overflow-hidden text-black shadow-2xl backdrop-blur-md border-l border-gray-300"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
        >
          {/* Top Controls */}
          <div className="border-b border-gray-300">
            <div
              className="flex items-center px-2 py-1 gap-2"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            >
              {/* Back & Forward Buttons */}
              <div className="flex items-center space-x-1">
                <button className="w-6 h-6 rounded-full bg-gradient-to-b from-blue-100 via-blue-300 to-blue-500 shadow-inner border border-white/70 flex items-center justify-center hover:scale-105 hover:ring-2 ring-blue-200 transition-all">
                  <span className="text-white font-bold text-sm drop-shadow">←</span>
                </button>
                <button className="w-6 h-6 rounded-full bg-gradient-to-b from-blue-100 via-blue-300 to-blue-500 shadow-inner border border-white/70 flex items-center justify-center hover:scale-105 hover:ring-2 ring-blue-200 transition-all">
                  <span className="text-white font-bold text-sm drop-shadow">→</span>
                </button>
              </div>

              {/* Path Bar */}
              <div className="flex-1 border border-gray-400 rounded px-3 py-[5px] bg-white/60 shadow-inner text-sm">
                Libraries &gt; {activeIcon}
              </div>

              {/* Search Box */}
              <input
                type="text"
                className="w-48 border border-gray-400 rounded px-2 py-[5px] text-sm placeholder:text-gray-500 bg-white/80 shadow-inner"
                placeholder={`Search ${activeIcon}`}
              />
            </div>
          </div>

          {/* Content Body */}
          <div className="flex h-[calc(100%-2.5rem)]">
            {/* Sidebar */}
            <div className="w-56 border-r border-gray-300 bg-gradient-to-b from-white via-gray-100 to-white p-3 text-sm">
              <div>
                <h2 className="font-semibold text-xs text-gray-500 uppercase">Libraries</h2>
                <ul className="mt-1 space-y-1">
                  {libraries.map((icon) => (
                    <li
                      key={icon}
                      className={`hover:bg-blue-100 px-2 py-1 rounded cursor-pointer ${
                        activeIcon === icon ? "bg-blue-100 font-semibold" : ""
                      }`}
                      onClick={() => setActiveIcon(icon)}
                    >
                      {icon}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main View */}
            <div className="flex-1 p-4 overflow-auto bg-white">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
