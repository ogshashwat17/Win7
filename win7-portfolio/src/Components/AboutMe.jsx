import React from "react";

export default function AboutMe({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-white border border-gray-400 shadow-2xl flex flex-col">
      {/* Header Bar */}
      <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
        <span className="text-sm font-semibold">About Me</span>
        <button
          onClick={onClose}
          className="hover:bg-red-600 w-6 h-6 rounded flex items-center justify-center"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 space-y-4">
        <p className="text-gray-800 text-base leading-relaxed">
          Hello! I'm Shashwat Srivastava, a tech enthusiast and developer passionate
          about building innovative solutions using web technologies, IoT, and machine learning.
          I love designing immersive digital experiences inspired by retro interfaces and real-world systems.
        </p>

        <img
          src="about-image.jpg" // replace with your actual image path
          alt="Shashwat"
          className="w-60 h-auto rounded shadow border mx-auto"
        />
      </div>
    </div>
  );
}
