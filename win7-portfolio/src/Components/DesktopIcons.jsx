import React from 'react';

function DesktopIcons({ name, icon, onClick }) {
  return (
    <div
      className="flex flex-col items-center text-black cursor-pointer w-20 hover:scale-105 transition-transform"
      onClick={onClick}
    >
      <img src={icon} alt={name} className="w-14 h-14 mb-1" />
      <span className="text-xs text-center leading-tight font-semibold">
        {name}
      </span>
    </div>
  );
}

export default DesktopIcons;
  