import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export default function TicTacToe() {
  const [gameState, setGameState] = useState({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    winningLine: null,
    scores: { X: 0, O: 0, draws: 0 },
  });

  const checkWinner = (board) => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], winningLine: combo };
      }
    }
    if (board.every(cell => cell !== null)) {
      return { winner: 'draw', winningLine: null };
    }
    return { winner: null, winningLine: null };
  };

  const handleCellClick = (index) => {
    if (gameState.board[index] || gameState.winner) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;
    const { winner, winningLine } = checkWinner(newBoard);
    const nextPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: nextPlayer,
      winner,
      winningLine,
    }));
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      winningLine: null,
    }));
  };

  const newGame = () => {
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      winningLine: null,
      scores: { X: 0, O: 0, draws: 0 },
    });
  };

  useEffect(() => {
    if (gameState.winner === 'X' || gameState.winner === 'O') {
      setGameState(prev => ({
        ...prev,
        scores: {
          ...prev.scores,
          [gameState.winner]: prev.scores[gameState.winner] + 1,
        },
      }));
    } else if (gameState.winner === 'draw') {
      setGameState(prev => ({
        ...prev,
        scores: {
          ...prev.scores,
          draws: prev.scores.draws + 1,
        },
      }));
    }
  }, [gameState.winner]);

  const getStatusMessage = () => {
    if (gameState.winner === 'draw') return "It's a draw!";
    if (gameState.winner) return `Player ${gameState.winner} wins!`;
    return `Player ${gameState.currentPlayer}'s turn`;
  };

  const getCellContent = (index) => {
    const player = gameState.board[index];
    if (!player) return '';
    return (
      <span className={`text-3xl font-bold ${player === 'X' ? 'text-blue-600' : 'text-red-500'}`}>
        {player}
      </span>
    );
  };

  const isCellInWinningLine = (index) => {
    return gameState.winningLine?.includes(index) || false;
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-start overflow-y-auto p-4 bg-white">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2 mb-1">
            <Trophy className="text-yellow-500" size={28} />
            Tic-Tac-Toe
          </h1>
          <p className="text-gray-600 text-sm">Challenge a friend to a classic game!</p>
        </div>

        {/* Scores */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-blue-50 rounded-md p-2 text-center">
            <div className="text-xl font-bold text-blue-600">{gameState.scores.X}</div>
            <div className="text-sm text-blue-800 font-medium">Player X</div>
          </div>
          <div className="bg-gray-50 rounded-md p-2 text-center">
            <div className="text-xl font-bold text-gray-600">{gameState.scores.draws}</div>
            <div className="text-sm text-gray-800 font-medium">Draws</div>
          </div>
          <div className="bg-red-50 rounded-md p-2 text-center">
            <div className="text-xl font-bold text-red-500">{gameState.scores.O}</div>
            <div className="text-sm text-red-700 font-medium">Player O</div>
          </div>
        </div>

        {/* Status */}
        <div className="text-center text-base font-semibold mb-3">
          <span className={`transition-colors duration-300 ${
            gameState.winner === 'draw' ? 'text-gray-600' :
            gameState.winner === 'X' ? 'text-blue-600' :
            gameState.winner === 'O' ? 'text-red-500' :
            gameState.currentPlayer === 'X' ? 'text-blue-600' : 'text-red-500'
          }`}>
            {getStatusMessage()}
          </span>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {gameState.board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              disabled={!!cell || !!gameState.winner}
              className={`aspect-square w-full bg-white rounded-md shadow
                flex items-center justify-center transition-all duration-200
                hover:shadow-md hover:scale-105 active:scale-95 disabled:cursor-not-allowed
                ${isCellInWinningLine(index) ? 'bg-green-100 ring-2 ring-green-400' : 'hover:bg-gray-50'}
                ${!cell && !gameState.winner ? 'hover:bg-opacity-80' : ''}`}
            >
              {getCellContent(index)}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          <button
            onClick={newGame}
            className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}
