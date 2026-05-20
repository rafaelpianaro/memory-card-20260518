// src/App.jsx
import { GameHeader } from './components/GameHeader';
import CardGame from './components/CardGame';
import { Footer } from './components/Footer';
import { useEffect, useState } from 'react';

// Emojis para os pares de cartas (10 pares = 20 cartas)
const cardEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'];

const PREVIEW_SECONDS = 5;

function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]); // IDs das cartas viradas aguardando verificação
  const [lockBoard, setLockBoard] = useState(false); // Trava o board enquanto verifica o par
  const [previewPhase, setPreviewPhase] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const initializeGame = () => {
    // Criar pares e adicionar IDs
    const pairedCards = [...cardEmojis, ...cardEmojis].map((value, index) => ({
      id: index,
      value,
      isFlipped: true, // começa virado para o preview
      isMatched: false
    }));

    // Embaralhar as cartas
    const shuffled = [...pairedCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setScore(0);
    setMoves(0);
    setFlippedCards([]);
    setLockBoard(true);
    setPreviewPhase(true);
    setCountdown(PREVIEW_SECONDS);
  };

  // Countdown e fim do preview
  useEffect(() => {
    if (!previewPhase) return;

    if (countdown <= 0) {
      setPreviewPhase(false);
      setLockBoard(false);
      setCards(prev => prev.map(card => ({ ...card, isFlipped: false })));
      return;
    }

    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [previewPhase, countdown]);

  useEffect(() => {
    initializeGame();
  }, []);

  // Efeito para verificar quando duas cartas estão viradas
  useEffect(() => {
    if (flippedCards.length === 2) {
      setLockBoard(true); // Trava o board
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      // Verifica se as cartas combinam
      if (firstCard.value === secondCard.value) {
        // Cartas combinam - marcar como matched
        setTimeout(() => {
          const updatedCards = cards.map(card => {
            if (card.id === firstId || card.id === secondId) {
              return { ...card, isMatched: true, isFlipped: false };
            }
            return card;
          });
          setCards(updatedCards);
          setScore(score + 10); // Ganha 10 pontos por par
          setFlippedCards([]);
          setLockBoard(false);
        }, 500);
      } else {
        // Cartas não combinam - desvirar após 1 segundo
        setTimeout(() => {
          const updatedCards = cards.map(card => {
            if (card.id === firstId || card.id === secondId) {
              return { ...card, isFlipped: false };
            }
            return card;
          });
          setCards(updatedCards);
          setFlippedCards([]);
          setLockBoard(false);
        }, 1000);
      }
    }
  }, [flippedCards, cards, score]);

  const handleCardClick = (clickedCard) => {
    // Não permitir clicar se:
    // - Board está travado
    // - Carta já está virada
    // - Carta já está combinada
    // - Já tem 2 cartas viradas aguardando
    if (lockBoard || clickedCard.isFlipped || clickedCard.isMatched || flippedCards.length === 2) {
      return;
    }

    // Virar a carta clicada
    const updatedCards = cards.map((card) => {
      if (card.id === clickedCard.id) {
        return { ...card, isFlipped: true };
      }
      return card;
    });

    setCards(updatedCards);
    setFlippedCards([...flippedCards, clickedCard.id]);
    setMoves(moves + 1);
  };

  // Verificar se o jogo terminou
  const allMatched = cards.length > 0 && cards.every(card => card.isMatched === true);

  return (
    <div className="min-h-screen bg-linear-to-r from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className='App'>
          <GameHeader score={score} moves={moves} onNewGame={initializeGame} />

          {/* Banner de preview */}
          {previewPhase && (
            <div className="bg-yellow-500/90 backdrop-blur-sm rounded-2xl p-4 mb-4 text-center text-white font-bold text-xl">
              👀 Memorize as cartas! O jogo começa em{' '}
              <span className="text-3xl font-extrabold">{countdown}</span>s
            </div>
          )}

          {/* Mensagem de vitória */}
          {allMatched && (
            <div className="bg-green-500/90 backdrop-blur-sm rounded-2xl p-4 mb-4 text-center text-white font-bold text-xl">
              🎉 PARABÉNS! Você completou o jogo em {moves} movimentos! 🎉
              <button
                onClick={initializeGame}
                className="ml-4 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg transition-colors"
              >
                Jogar Novamente
              </button>
            </div>
          )}

          {/* Grid do jogo */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/10">
            <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
              {cards.map((card) => (
                <CardGame
                  key={card.id}
                  card={card}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;