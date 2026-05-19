import React from 'react';

const CardGame = ({ card, onClick }) => {
  return (
    <div
      onClick={() => onClick(card)}
      className={`
        aspect-square rounded-xl cursor-pointer transition-all duration-300
        transform hover:scale-105 hover:shadow-2xl
        ${card.isMatched
          ? 'bg-linear-to-r from-green-600 to-emerald-700 opacity-60 cursor-default hover:scale-100'
          : card.isFlipped
            ? 'bg-linear-to-r from-white to-gray-100 shadow-lg'
            : 'bg-linear-to-r from-gray-700 to-gray-800 shadow-md hover:border-yellow-400'
        }
        flex items-center justify-center text-4xl font-bold
        border-2 ${card.isMatched
          ? 'border-green-400'
          : card.isFlipped
            ? 'border-yellow-400'
            : 'border-white/30'
        }
      `}
    >
      {(card.isFlipped || card.isMatched) ? card.value : '?'}
    </div>
  );
};

export default CardGame;