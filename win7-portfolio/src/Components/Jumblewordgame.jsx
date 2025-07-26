// JumbleGame.jsx
import React, { useState, useEffect } from 'react';
import { Shuffle, Lightbulb, RotateCcw } from 'lucide-react';

const words = [
  { word: 'HOUSE', hint: 'A place where people live' },
  { word: 'WATER', hint: 'Essential liquid for life' },
  { word: 'PHONE', hint: 'Device for communication' },
  { word: 'CHAIR', hint: 'Furniture for sitting' },
  { word: 'PLANT', hint: 'Green living thing' },
  { word: 'BEACH', hint: 'Sandy shore by ocean' },
  { word: 'MUSIC', hint: 'Sounds and rhythms' },
  { word: 'HAPPY', hint: 'Feeling of joy' },
  { word: 'SMILE', hint: 'Expression of happiness' },
  { word: 'GARDEN', hint: 'Place for growing plants' },
  { word: 'LAPTOP', hint: 'Portable computer' },
  { word: 'KITCHEN', hint: 'Room for cooking' },
  { word: 'RAINBOW', hint: 'Colorful arc in sky' },
  { word: 'LIBRARY', hint: 'Place with many books' },
  { word: 'MORNING', hint: 'Early part of day' },
];

const scrambleWord = (word) => {
  const letters = word.split('');
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  const scrambled = letters.join('');
  if (scrambled === word && word.length > 3) {
    return scrambleWord(word);
  }
  return scrambled;
};

const getRandomWord = () => {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
};

export default function JumbleGame() {
  const [currentWord, setCurrentWord] = useState(null);
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [message, setMessage] = useState('');

  const loadNewWord = () => {
    const word = getRandomWord();
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word.word));
    setUserGuess('');
    setShowHint(false);
    setMessage('');
  };

  useEffect(() => {
    loadNewWord();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentWord || !userGuess.trim()) return;

    if (userGuess.toUpperCase() === currentWord.word) {
      setScore(score + 10);
      setMessage('Correct! 🎉');
      setTimeout(() => loadNewWord(), 1500);
    } else {
      setMessage('Try again! 💪');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shuffle className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Jumble Game</h1>
          </div>
          <div className="text-2xl font-bold text-blue-600">Score: {score}</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          {message && (
            <div className="text-center mb-6">
              <p className="text-lg font-semibold text-gray-700">{message}</p>
            </div>
          )}

          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-blue-600 tracking-wider mb-4 font-mono">
              {scrambledWord.split('').map((letter, index) => (
                <span
                  key={index}
                  className="inline-block mx-1 p-3 bg-blue-100 rounded-lg"
                >
                  {letter}
                </span>
              ))}
            </div>
            <p className="text-gray-500">Unscramble these letters!</p>
          </div>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value.toUpperCase())}
                placeholder="Your guess..."
                className="flex-1 px-4 py-3 text-xl text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Submit
              </button>
            </div>
          </form>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setShowHint(true)}
              disabled={showHint}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              {showHint ? 'Hint Used' : 'Get Hint'}
            </button>

            <button
              onClick={loadNewWord}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              New Word
            </button>
          </div>

          {showHint && currentWord && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
              <p className="text-yellow-800 font-medium">
                💡 Hint: {currentWord.hint}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
