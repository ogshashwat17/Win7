import React, { useState, useEffect } from 'react';

function TimeDate() {
  const [dateTime, setDateTime] = useState({
    time: '',
    date: '',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const time = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      const date = now.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      setDateTime({ time, date });
    };

    updateTime(); 
    const interval = setInterval(updateTime, 10000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-right text-white text-xs leading-tight font-mono">
      <div>{dateTime.time}</div>
      <div>{dateTime.date}</div>
    </div>
  );
}

export default TimeDate;
