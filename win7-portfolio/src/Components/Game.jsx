// src/Components/Games.jsx
import React, { useState } from "react";
import TicTacToe from "./TicTacToe";
import JumbleGame from "./Jumblewordgame";

export default function Games() {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    {
      name: "Tic Tac Toe",
      image: "folder.jpg",
      component: <TicTacToe />,
    },
    {
      name: "Jumble Word",
      image: "folder.jpg",
      component: <JumbleGame />,
    },
  ];

  const selectedGame = games.find((g) => g.name === activeGame);

  return (
    <div className="relative space-y-4">
      <h1 className="text-lg font-semibold">Games Library</h1>

      {/* Game Icons */}
      <div className="flex gap-6">
        {games.map((game) => (
          <div
            key={game.name}
            onClick={() => setActiveGame(game)}
            className="flex flex-col items-center p-3 cursor-pointer hover:bg-blue-100 transition rounded"
          >
            <img
              src={game.image}
              alt={game.name}
              className="w-12 h-12 object-contain mb-1"
            />
            <div className="text-sm">{game.name}</div>
          </div>
        ))}
      </div>

      {/* Fullscreen Game Window */}
      {activeGame && (
        <div className="fixed inset-0 z-50 bg-white border border-gray-400 shadow-2xl flex flex-col">
          {/* Header Bar */}
          <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
            <span className="text-sm font-semibold">{activeGame.name}</span>
            <button
              onClick={() => setActiveGame(null)}
              className="hover:bg-red-600 w-6 h-6 rounded flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Game Content */}
          <div className="flex-1 overflow-auto p-4">{activeGame.component}</div>
        </div>
      )}
    </div>
  );
}
