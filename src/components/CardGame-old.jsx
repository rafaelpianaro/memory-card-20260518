import React from 'react';

const MemoryCardGame = ({card}) => {
  return (
    <>
        {/* Grade do Jogo - 4x5 (20 cartas) */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/10">
          <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
            {/* Renderização das 20 cartas */}
            {Array(20).fill().map((card, index) => (
                <div
                key={index}
                className="aspect-square rounded-xl cursor-pointer transition-all duration-300
                transform hover:scale-105 hover:shadow-2xl
                bg-linear-to-r from-gray-700 to-gray-800 shadow-md
                flex items-center justify-center text-4xl
                border-2 border-white/30 hover:border-yellow-400"
                >
                ?
              </div>
            ))}
          </div>
        </div>

        {/* Instruções */}
        <div className="mt-4 text-center text-white/60 text-sm">
          💡 Clique nas cartas para encontrar os pares correspondentes
        </div>
    </>
  );
};

export default MemoryCardGame;