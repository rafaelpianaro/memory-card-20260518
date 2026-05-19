// src/components/GameHeader.jsx
import React from 'react';

const GameHeader = ({ score, moves, onNewGame }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-2xl border border-white/20">
      <h1 className="text-4xl font-bold text-center mb-6 bg-linear-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
        🧠 Memory Card Game
      </h1>

      <div className="flex justify-between items-center gap-8 flex-wrap">
        <div className="flex-1 bg-linear-to-r from-yellow-500 to-orange-500 rounded-xl p-4 shadow-lg">
          <div className="text-white/90 text-sm font-semibold">SCORE</div>
          <div className="text-white text-3xl font-bold">{score}</div>
        </div>

        <div className="flex-1 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl p-4 shadow-lg">
          <div className="text-white/90 text-sm font-semibold">MOVES</div>
          <div className="text-white text-3xl font-bold">{moves}</div>
        </div>

        <button
          onClick={onNewGame}
          className="flex-1 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700
                   text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105
                   shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <span className="text-xl">🔄</span>
          New Game
        </button>
      </div>
    </div>
  );
};

export { GameHeader };